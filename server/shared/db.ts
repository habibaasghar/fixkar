import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 requires an explicit driver adapter — there is no more implicit
// "read datasource.url from schema.prisma" connection at runtime. This uses
// the pooled DATABASE_URL (PgBouncer) since this is what the running app
// (serverless functions) should reuse connections through. The Prisma CLI
// (migrate/introspect) connects separately via DIRECT_URL, configured in
// prisma.config.ts — that path never touches this adapter.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres",
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
