import { AsyncLocalStorage } from "node:async_hooks";

interface RequestContext {
  requestId: string;
}

const storage = new AsyncLocalStorage<RequestContext>();

/** Wraps a request handler so every log call made anywhere during its execution — without threading requestId through every function signature — can pick it up via getCurrentRequestId(). */
export function withRequestContext<T>(requestId: string, fn: () => Promise<T>): Promise<T> {
  return storage.run({ requestId }, fn);
}

export function getCurrentRequestId(): string | undefined {
  return storage.getStore()?.requestId;
}
