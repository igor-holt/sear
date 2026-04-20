import {
  benchmarkSummary,
  featureCards,
  launchChecklist,
  productName,
  productTagline,
  productStats,
  siteDescription,
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
  });
}
