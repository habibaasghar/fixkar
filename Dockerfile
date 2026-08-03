# Multi-stage build targeting Next.js's `output: "standalone"` mode (see
# next.config.ts) — the final image ships only the traced production
# dependencies, not the full node_modules tree.
#
# NOT BUILT OR RUN IN THIS ENVIRONMENT — there is no Docker daemon available
# here (`docker --version` fails), so this Dockerfile has never actually been
# built. It's written against documented Next.js standalone-output patterns;
# verify with `docker build .` in an environment that has Docker before
# relying on it.

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Placeholder values only — real secrets are injected at deploy time (never
# baked into the image). Supabase URL/key are read at build time by a few
# client-side modules; DATABASE_URL isn't needed until runtime.
ENV NODE_ENV=production
ENV NEXT_PUBLIC_SUPABASE_URL="https://placeholder.supabase.co"
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY="placeholder"
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/api/v1/health/live').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
