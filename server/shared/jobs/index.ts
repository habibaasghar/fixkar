import { registerJob } from "./job.registry";
import { expireStaleLeadsJob } from "./definitions/expire-stale-leads.job";
import { processNotificationsJob } from "./definitions/process-notifications.job";
import { refreshVendorAvailabilityJob } from "./definitions/refresh-vendor-availability.job";
import { reconcileWalletsJob } from "./definitions/reconcile-wallets.job";
import { cleanupOldDispatchesJob } from "./definitions/cleanup-old-dispatches.job";
import { generateDailyReportJob } from "./definitions/generate-daily-report.job";

export { runJob } from "./job.runner";
export { listJobs } from "./job.registry";

/**
 * Registers every background job exactly once. Import this module (not the
 * individual job files) from anywhere that needs to run or list jobs — the
 * admin routes do this. See docs/background-jobs.md for how each of these
 * is meant to be scheduled in production (pg_cron calling a Supabase Edge
 * Function that hits the admin "run job" endpoint, or an external scheduler
 * doing the same) — none of that scheduling infrastructure exists yet since
 * there's no live Supabase project connected in this environment.
 */
let registered = false;
export function ensureJobsRegistered(): void {
  if (registered) return;
  registerJob(expireStaleLeadsJob);
  registerJob(processNotificationsJob);
  registerJob(refreshVendorAvailabilityJob);
  registerJob(reconcileWalletsJob);
  registerJob(cleanupOldDispatchesJob);
  registerJob(generateDailyReportJob);
  registered = true;
}
