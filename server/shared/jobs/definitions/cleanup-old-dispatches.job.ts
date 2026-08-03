import { JobDefinition } from "../job.types";
import { QueueService } from "@/server/modules/notifications/queue.service";

const RETENTION_DAYS = 30;

/** Idempotent: the deleteMany's WHERE clause only matches rows older than the cutoff — a second run has nothing left to delete for the same window. */
export const cleanupOldDispatchesJob: JobDefinition = {
  name: "cleanup-old-dispatches",
  description: "Deletes terminal-state (SENT/DELIVERED/FAILED/CANCELLED) notification dispatches older than 30 days.",
  run: async () => {
    const count = await QueueService.cleanupOldDispatches(RETENTION_DAYS);
    return { success: true, message: `Deleted ${count} old notification dispatch record(s).`, data: { count } };
  },
};
