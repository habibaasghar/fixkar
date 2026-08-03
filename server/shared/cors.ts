/**
 * Same-origin browser calls (the Next.js frontend calling its own API routes)
 * never hit CORS at all. This only matters for: (a) local dev on a different
 * port, (b) a future separately-hosted admin panel, (c) browser-based
 * third-party integrations. Native mobile apps (V2) aren't subject to CORS —
 * it's a browser-only mechanism — so this allowlist doesn't need to (and
 * shouldn't) cover them.
 */
const ALLOWED_ORIGINS = (process.env.CORS_ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin");
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return {};
  }
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    Vary: "Origin",
  };
}
