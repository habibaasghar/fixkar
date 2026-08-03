import { JobDefinition } from "../job.types";
import { LeadService } from "@/server/modules/leads/lead.service";

const ASSIGNMENT_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes, per Phase 8's acceptance-window spec

/** Idempotent: LeadRepository.tryTransition is a guarded atomic update, so re-running this on an overlapping window just skips leads already moved on. */
export const expireStaleLeadsJob: JobDefinition = {
  name: "expire-stale-leads",
  description: "Reassigns or expires leads whose currently-assigned vendor hasn't accepted/rejected within the acceptance window.",
  run: async () => {
    const result = await LeadService.expireStaleAssignments(ASSIGNMENT_TIMEOUT_MS);
    return {
      success: true,
      message: `Processed ${result.processed} stale lead(s): ${result.reassigned} reassigned, ${result.expired} expired.`,
      data: result,
    };
  },
};
