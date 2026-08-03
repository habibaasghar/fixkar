export type ErrorDetail = {
  field?: string;
  issue: string;
};

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: ErrorDetail[];

  constructor(message: string, statusCode = 500, code = "INTERNAL_ERROR", details?: ErrorDetail[]) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Request validation failed.", details?: ErrorDetail[]) {
    super(message, 400, "VALIDATION_ERROR", details);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication required.") {
    super(message, 401, "UNAUTHENTICATED");
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Access denied.") {
    super(message, 403, "FORBIDDEN");
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Requested resource not found.") {
    super(message, 404, "NOT_FOUND");
  }
}

export class ConflictError extends AppError {
  constructor(message = "Resource conflict occurred.") {
    super(message, 409, "CONFLICT");
  }
}

export class WalletInsufficientError extends AppError {
  constructor(message = "Insufficient wallet balance to accept this lead.") {
    super(message, 402, "WALLET_INSUFFICIENT");
  }
}

export class RateLimitError extends AppError {
  constructor(message = "Too many requests. Please try again later.") {
    super(message, 429, "RATE_LIMIT_EXCEEDED");
  }
}

export class ExternalServiceError extends AppError {
  constructor(message = "An upstream service failed. Please try again.") {
    super(message, 502, "EXTERNAL_SERVICE_ERROR");
  }
}

export class InternalError extends AppError {
  constructor(message = "An internal server error occurred.") {
    super(message, 500, "INTERNAL_ERROR");
  }
}
