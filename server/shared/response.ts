import { NextResponse } from "next/server";
import { AppError, ValidationError } from "./errors";
import { logger } from "./logger";
import { ZodError } from "zod";
import { getRequestId } from "./request-id";
import { getCorsHeaders } from "./cors";
import { withRequestContext } from "./request-context";
import { captureException } from "./observability/sentry";

export type ApiResponse<T = unknown> = {
  ok: boolean;
  data?: T;
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
    hasMore?: boolean;
  };
  error?: {
    code: string;
    message: string;
    details?: Array<{ field?: string; issue: string }>;
  };
};

export function apiSuccess<T>(data: T, meta?: ApiResponse["meta"], status = 200) {
  const body: ApiResponse<T> = {
    ok: true,
    data,
    ...(meta ? { meta } : {}),
  };
  return NextResponse.json(body, { status });
}

export function apiError(error: unknown, requestId?: string) {
  if (error instanceof ZodError) {
    const details = error.issues.map((e) => ({
      field: e.path.join("."),
      issue: e.message,
    }));
    const valErr = new ValidationError("Invalid request data.", details);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: valErr.code,
          message: valErr.message,
          details: valErr.details,
        },
      },
      { status: valErr.statusCode }
    );
  }

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: error.code,
          message: error.message,
          ...(error.details ? { details: error.details } : {}),
        },
      },
      { status: error.statusCode }
    );
  }

  // Unhandled internal server error
  logger.error({
    module: "api",
    action: "unhandled_error",
    message: error instanceof Error ? error.message : "Unknown error occurred",
    data: requestId ? { requestId } : undefined,
    error,
  });
  void captureException(error, requestId ? { requestId } : undefined);

  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "An internal server error occurred.",
      },
    },
    { status: 500 }
  );
}

/**
 * Wraps every API route handler: catches thrown errors into the standard
 * error envelope, attaches a correlation ID + CORS headers to every response
 * (success or error) from one place instead of per-route boilerplate, and
 * runs the handler inside an AsyncLocalStorage context so every `logger.*`
 * call made anywhere during this request — services, repositories, jobs
 * triggered synchronously from it — automatically carries the same
 * requestId without threading it through every function signature.
 */
export function withErrorHandler<T>(
  handler: (req: Request, context?: unknown) => Promise<NextResponse<ApiResponse<T>>>
) {
  return async (req: Request, context?: unknown) => {
    const requestId = getRequestId(req);
    const corsHeaders = getCorsHeaders(req);

    const response = await withRequestContext(requestId, async () => {
      try {
        return await handler(req, context);
      } catch (err) {
        return apiError(err, requestId);
      }
    });

    response.headers.set("X-Request-Id", requestId);
    for (const [key, value] of Object.entries(corsHeaders)) {
      response.headers.set(key, value);
    }

    return response;
  };
}
