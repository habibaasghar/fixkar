/** Correlates a single request across logs and the error response returned to the client. */
export function getRequestId(req: Request): string {
  return req.headers.get("x-request-id") || crypto.randomUUID();
}
