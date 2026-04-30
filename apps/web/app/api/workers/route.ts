import { ambientIntegration, notionWorkers, workerSyncSummary } from "@/lib/site";

export async function GET() {
  return Response.json({
    summary: workerSyncSummary,
    ambientIntegration,
    workers: notionWorkers,
  });
}
