import { PHASE_PRODUCTION_BUILD } from "next/constants";

/**
 * Fails fast on missing configuration in production; allows placeholder
 * fallbacks in development so local setup doesn't require full Supabase
 * credentials just to run `next dev`. Called once at app.config.ts load time.
 *
 * `next build` always runs with NODE_ENV=production (even in CI/Docker builds
 * that intentionally have no runtime secrets yet — 12-factor apps inject
 * those at deploy time). Next.js sets NEXT_PHASE=phase-production-build only
 * during that build step, which is what lets this distinguish "building the
 * artifact" from "actually serving production traffic."
 */
const REQUIRED_IN_PRODUCTION = [
  "DATABASE_URL",
  "DIRECT_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "JWT_SECRET",
] as const;

export function validateEnv(): void {
  if (process.env.NODE_ENV !== "production") return;
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) return;

  const missing = REQUIRED_IN_PRODUCTION.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Refusing to start in production: missing required environment variable(s): ${missing.join(", ")}.`
    );
  }
}
