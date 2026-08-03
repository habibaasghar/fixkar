import { JobDefinition } from "../job.types";
import { QueueService } from "@/server/modules/notifications/queue.service";

const BATCH_SIZE = 100;

/** Idempotent: QueueRepository.tryClaim atomically guards PENDING->PROCESSING, so overlapping runs never double-send the same dispatch. */
export const processNotificationsJob: JobDefinition = {
  name: "process-notifications",
  description: "Drains due notification dispatches through their provider (Phase 16's queue).",
  run: async () => {
    const result = await QueueService.processPendingBatch(BATCH_SIZE);
    return {
      success: true,
      message: `Processed ${result.processed} dispatch(es): ${result.sent} sent, ${result.retrying} retrying, ${result.failed} failed.`,
      data: result,
    };
  },
};
