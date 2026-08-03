/**
 * Next.js instrumentation hook — runs once per server instance at startup,
 * before any request is handled. This is the correct place to register
 * OpenTelemetry (per @vercel/otel's own docs) and initialize Sentry.
 *
 * Both are no-ops unless explicitly configured via env vars — neither has
 * been exercised against a real collector/DSN in this environment (no
 * OTEL_EXPORTER_OTLP_ENDPOINT or SENTRY_DSN is set here, and @sentry/nextjs
 * isn't even installed — see server/shared/observability/sentry.ts for why).
 */
export async function register() {
  if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    const { registerOTel } = await import("@vercel/otel");
    registerOTel({
      serviceName: process.env.OTEL_SERVICE_NAME || "fixkar-api",
      traceExporter: "auto", // reads OTEL_EXPORTER_OTLP_ENDPOINT / OTEL_EXPORTER_OTLP_HEADERS itself
    });
  }

  const { initSentry } = await import("@/server/shared/observability/sentry");
  await initSentry();
}
