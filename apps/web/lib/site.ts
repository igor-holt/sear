import benchmarkSnapshot from "@/data/benchmarks.json";

export type BenchmarkResult = {
  label: string;
  path: string;
  latencyTailMs: number;
  requestsPerSec: number;
  throughputKbPerSec: number;
  transferredBytes: number;
};

type BenchmarkSnapshot = {
  generatedAt: string | null;
  scenario: string;
  results: BenchmarkResult[];
  artifacts: {
    robots: boolean;
    sitemapTxt: boolean;
    llmsTxt: boolean;
  };
};

export const productName = "SEAR";
export const productTagline = "Self Evolving Agent Retrainer";
export const siteDescription =
  "SEAR turns agent runs into evaluable evidence, benchmarkable releases, and ChatGPT-native operator tooling.";

export const productStats = [
  { value: "3", label: "operator surfaces", detail: "site, MCP app, and CLI" },
  { value: "0-click", label: "handoff path", detail: "ship from chat to preview" },
  { value: "Read-only", label: "app tools", detail: "submission-safe by default" },
];

export const featureCards = [
  {
    title: "Benchmark-first releases",
    body:
      "Every release can publish measurable latency, throughput, and visibility artifacts instead of hand-wavy launch copy.",
  },
  {
    title: "ChatGPT app surface",
    body:
      "SEAR exposes a remote MCP endpoint with UI resources so operators can inspect release posture from inside ChatGPT developer mode.",
  },
  {
    title: "Composable CLI",
    body:
      "The `sear` command ships doctor, overview, benchmark, sitemap, and raw GET requests for future Codex threads.",
  },
  {
    title: "Search-visible launch posture",
    body:
      "Robots, sitemap XML, sitemap text, llms.txt, structured metadata, and clean canonical URLs are built in from day one.",
  },
];

export const launchChecklist = [
  "Build the Next.js app and the installable CLI from one workspace.",
  "Verify local functionality with tests and a benchmark harness.",
  "Expose a remote MCP endpoint for ChatGPT developer mode.",
  "Publish visibility files and metadata for search and LLM discovery.",
];

export const docsSections = [
  {
    heading: "Local dev",
    body: "Run `pnpm install`, then `pnpm dev` to boot the SEAR site locally on port 3000.",
  },
  {
    heading: "ChatGPT app",
    body:
      "Point ChatGPT developer mode at `/api/mcp` on a stable HTTPS deployment. The MCP server is stateless and read-only.",
  },
  {
    heading: "CLI",
    body:
      "Install `sear` globally with `pnpm install:cli`, then use `sear --json doctor` from any working directory.",
  },
];

export const benchmarkSummary = benchmarkSnapshot as BenchmarkSnapshot;

export function getSiteUrl(hostOverride?: string) {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (hostOverride) {
    const protocol = hostOverride.includes("localhost") ? "http" : "https";
    return `${protocol}://${hostOverride}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export function withSiteUrl(path: string, hostOverride?: string) {
  return new URL(path, getSiteUrl(hostOverride)).toString();
}

export const staticRoutes = ["/", "/benchmarks", "/docs", "/privacy"];
