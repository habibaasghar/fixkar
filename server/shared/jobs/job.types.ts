export interface JobResult {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

export interface JobDefinition {
  name: string;
  description: string;
  /** Every job must be safe to run more than once for the same window — see each definition's own docstring for how it guarantees this. */
  run: () => Promise<JobResult>;
}
