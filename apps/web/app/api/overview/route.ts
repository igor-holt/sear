import {
  ambientIntegration,
  benchmarkSummary,
  featureCards,
  launchChecklist,
  notionWorkers,
  productName,
  productTagline,
  productStats,
  siteDescription,
  workerSyncSummary,
} from "@/lib/site";

export async function GET() {
  return Response.json({
    productName,
    productTagline,
    siteDescription,
    stats: productStats,
    features: featureCards,
    launchChecklist,
    benchmarkScenario: benchmarkSummary.scenario,
    workerSync: workerSyncSummary,
    ambientIntegration,
    notionWorkerCount: notionWorkers.length,
  });
}
