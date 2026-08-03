import { getJob } from "./job.registry";
import { NotFoundError } from "../errors";
import { logger } from "../logger";
import { JobResult } from "./job.types";

/**
 * Runs one registered job by name and logs its outcome. This is what an
 * admin "run job" endpoint calls today, and what a real scheduler
 * (pg_cron calling a Supabase Edge Function, or any external cron hitting an
 * admin endpoint) would call in production — nothing here assumes HTTP,
 * so the same function works from either caller.
 */
export async function runJob(name: string): Promise<JobResult> {
  const job = getJob(name);
  if (!job) throw new NotFoundError(`Unknown job: "${name}".`);

  const startedAt = Date.now();
  logger.info({ module: "jobs", action: name, message: `Job "${name}" started` });

  try {
    const result = await job.run();
    logger.info({
      module: "jobs",
      action: name,
      message: `Job "${name}" finished: ${result.message}`,
      data: { ...result.data, durationMs: Date.now() - startedAt, success: result.success },
    });
    return result;
  } catch (err) {
    logger.error({
      module: "jobs",
      action: name,
      message: `Job "${name}" threw an unhandled error`,
      data: { durationMs: Date.now() - startedAt },
      error: err,
    });
    throw err;
  }
}
