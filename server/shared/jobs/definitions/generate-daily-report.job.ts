import { JobDefinition } from "../job.types";
import { ReportService } from "@/server/modules/reports/report.service";
import { logger } from "../../logger";

/**
 * Idempotent: purely reads the ledger and logs a summary — no writes, so
 * running it twice for the same day just logs the same numbers twice.
 * No report-storage table exists yet, so "generating" a report means
 * computing it from the ledger (the source of truth) and emitting a
 * structured log line tagged for a future log-aggregation/alerting
 * pipeline to pick up — see Phase 17 documentation for what a real
 * "store + email" version would add on top of this.
 */
export const generateDailyReportJob: JobDefinition = {
  name: "generate-daily-report",
  description: "Computes yesterday's commission/vendor-earnings/refund summary and logs it as a structured report.",
  run: async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const summary = await ReportService.getSummary({
      from: new Date(yesterday.setHours(0, 0, 0, 0)),
      to: new Date(yesterday.setHours(23, 59, 59, 999)),
    });

    logger.info({
      module: "reports",
      action: "dailySummary",
      message: `Daily report for ${yesterday.toISOString().slice(0, 10)}`,
      data: summary,
    });

    return { success: true, message: "Daily report generated and logged.", data: summary };
  },
};
