import { defineConfig } from "@prisma/config";

// The Prisma CLI only auto-loads `.env`, not Next.js's `.env.local`. Load
// `.env.local` here so `prisma migrate dev/deploy/studio` sees DIRECT_URL from
// the same single file the app uses. Wrapped in try/catch: on Vercel there is
// no .env.local (env comes from the platform), and this must not throw there.
try {
  process.loadEnvFile(".env.local");
} catch {
  // no .env.local present (e.g. CI / Vercel) — env is provided by the platform
}

// This `url` is used only by Prisma CLI commands (migrate, introspect, studio),
// NOT by the application at runtime. It must be the DIRECT (non-pooled)
// connection string — Supabase's pooled PgBouncer connection (DATABASE_URL)
// doesn't support the session-level advisory locks `prisma migrate` needs.
// The running app connects separately via a driver adapter in
// server/shared/db.ts, using the pooled DATABASE_URL. See that file for why.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL || "postgresql://postgres:postgres@localhost:5432/postgres",
  },
});
