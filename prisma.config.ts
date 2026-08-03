import { defineConfig } from "@prisma/config";

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
