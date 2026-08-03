/**
 * UNVERIFIED / NOT INSTALLED IN THIS ENVIRONMENT.
 *
 * `npm install @sentry/nextjs` failed in this sandboxed Windows dev
 * environment — its postinstall script (@sentry/cli) spawns `cmd.exe` to
 * fetch a platform binary, which errors here (ENOENT). The package is
 * therefore NOT in package.json/node_modules, and this file has never
 * actually imported or exercised the real Sentry SDK. The import string is
 * built from concatenation so TypeScript doesn't try to resolve types for a
 * package that isn't installed here.
 *
 * This wrapper is written against @sentry/nextjs's documented API and is
 * safe to ship as-is: the dynamic import is wrapped in try/catch, so if the
 * package is absent (as it is right now) or SENTRY_DSN isn't set, every
 * function here silently no-ops instead of crashing the app. To actually
 * activate it: run `npm install @sentry/nextjs` in an environment where that
 * succeeds (a normal Linux CI/deploy target, or Windows with a working
 * cmd.exe on PATH), set SENTRY_DSN, and verify with a deliberate test error.
 */

interface SentryModule {
  init(options: { dsn: string; environment?: string; tracesSampleRate?: number }): void;
  captureException(error: unknown, hint?: { extra?: Record<string, unknown> }): void;
}

let initialized = false;
const SENTRY_PACKAGE = "@sentry/" + "nextjs";

async function getSentry(): Promise<SentryModule | null> {
  if (!process.env.SENTRY_DSN) return null;
  try {
    // Dynamic import: only touched when SENTRY_DSN is set, and tolerates the
    // package being absent (this environment) without breaking anything else.
    return (await import(/* webpackIgnore: true */ SENTRY_PACKAGE)) as SentryModule;
  } catch {
    return null;
  }
}

export async function initSentry(): Promise<void> {
  if (initialized) return;
  const Sentry = await getSentry();
  if (!Sentry) return;

  Sentry.init({
    dsn: process.env.SENTRY_DSN!,
    environment: process.env.NODE_ENV,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  });
  initialized = true;
}

export async function captureException(error: unknown, context?: Record<string, unknown>): Promise<void> {
  const Sentry = await getSentry();
  if (!Sentry) return;
  Sentry.captureException(error, { extra: context });
}
