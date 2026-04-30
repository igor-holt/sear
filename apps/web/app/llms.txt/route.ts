import { withSiteUrl } from "@/lib/site";

export async function GET(request: Request) {
  const host = new URL(request.url).host;

  const body = [
    "# SEAR",
    "> Self Evolving Agent Retrainer ships a benchmarked launch surface with a read-only remote MCP endpoint and installable CLI.",
    "",
    "## Canonical URLs",
    withSiteUrl("/", host),
    withSiteUrl("/benchmarks", host),
    withSiteUrl("/docs", host),
    withSiteUrl("/privacy", host),
    "",
    "## Machine-readable endpoints",
    withSiteUrl("/api/overview", host),
    withSiteUrl("/api/benchmark", host),
    withSiteUrl("/api/workers", host),
    withSiteUrl("/api/mcp", host),
  ].join("\n");

  return new Response(`${body}\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
