import type { NextConfig } from "next";

// A strict Content-Security-Policy is intentionally deferred: this app will
// embed third-party scripts (analytics, maps, WhatsApp widgets) whose sources
// aren't finalized yet, and shipping a wrong CSP risks blank-paging the site
// with no live environment to catch it. Track as technical debt.
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  // Minimal, self-contained production output (Dockerfile copies just
  // .next/standalone + .next/static) instead of shipping full node_modules.
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
