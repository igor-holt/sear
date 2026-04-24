import { benchmarkSummary } from "@/lib/site";

export async function GET() {
  return Response.json(benchmarkSummary);
}
