import React from "react";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // JSON.stringify does not escape "<", so a string value containing
  // "</script>" would prematurely close this tag and inject arbitrary HTML.
  // Only static config strings flow through this today, but any schema here
  // taking user-generated text later (a vendor bio, a review comment) would
  // otherwise be XSS-exploitable. < parses back to "<" as valid JSON,
  // so structured-data validity is unaffected.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
