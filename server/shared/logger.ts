import { getCurrentRequestId } from "./request-context";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogPayload {
  module?: string;
  action?: string;
  message: string;
  data?: Record<string, unknown>;
  error?: unknown;
}

const SENSITIVE_KEY_PATTERN = /phone|cnic|email|token|otp|password|secret|authorization/i;

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8) return "***";
  return `${digits.slice(0, 4)}***${digits.slice(-4)}`;
}

export function maskCnic(cnic: string): string {
  const match = cnic.match(/^(\d{5})-(\d{7})-(\d{1})$/);
  if (!match) return "***";
  return `${match[1]}-***${match[2].slice(-3)}-${match[3]}`;
}

export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return "***";
  return `${user.charAt(0)}***@${domain}`;
}

export function maskToken(token: string): string {
  if (token.length <= 4) return "***";
  return `***${token.slice(-4)}`;
}

/** Best-effort masking of any field whose key name looks sensitive, for values passed via LogPayload.data. */
function scrubSensitive(data: Record<string, unknown>): Record<string, unknown> {
  const scrubbed: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string" && SENSITIVE_KEY_PATTERN.test(key)) {
      if (/cnic/i.test(key)) {
        scrubbed[key] = maskCnic(value);
      } else if (/email/i.test(key)) {
        scrubbed[key] = maskEmail(value);
      } else if (/phone/i.test(key)) {
        scrubbed[key] = maskPhone(value);
      } else {
        scrubbed[key] = maskToken(value);
      }
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      scrubbed[key] = scrubSensitive(value as Record<string, unknown>);
    } else {
      scrubbed[key] = value;
    }
  }
  return scrubbed;
}

class Logger {
  private formatLog(level: LogLevel, payload: LogPayload) {
    const timestamp = new Date().toISOString();
    const requestId = getCurrentRequestId();
    const logObject = {
      timestamp,
      level,
      module: payload.module || "core",
      action: payload.action || "general",
      message: payload.message,
      ...(requestId ? { requestId } : {}),
      ...(payload.data ? { data: scrubSensitive(payload.data) } : {}),
      ...(payload.error instanceof Error
        ? { errorName: payload.error.name, errorMessage: payload.error.message, stack: payload.error.stack }
        : payload.error
        ? { error: payload.error }
        : {}),
    };

    if (process.env.NODE_ENV === "production") {
      return JSON.stringify(logObject);
    }
    return `[${timestamp}] [${level.toUpperCase()}] [${logObject.module}:${logObject.action}] ${payload.message}`;
  }

  info(payload: LogPayload) {
    console.log(this.formatLog("info", payload));
  }

  warn(payload: LogPayload) {
    console.warn(this.formatLog("warn", payload));
  }

  error(payload: LogPayload) {
    console.error(this.formatLog("error", payload));
  }

  debug(payload: LogPayload) {
    if (process.env.NODE_ENV !== "production") {
      console.debug(this.formatLog("debug", payload));
    }
  }
}

export const logger = new Logger();
