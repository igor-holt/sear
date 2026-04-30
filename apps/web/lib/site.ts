import benchmarkSnapshot from "@/data/benchmarks.json";

export type BenchmarkResult = {
  label: string;
  path: string;
  latencyTailMs: number;
  requestsPerSec: number;
  throughputKbPerSec: number;
  transferredBytes: number;
};

export type NotionWorker = {
  id: string;
  name: string;
  status: "Enabled";
  owner: string;
  enabledAt: string;
  updatedAt: string;
  domain: string;
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

export const ambientIntegration = {
  endpoint: "https://ambient-mcp-server.iholt.workers.dev/mcp",
  healthEndpoint: "https://ambient-mcp-server.iholt.workers.dev/health",
  transport: "cloudflare-worker",
  notionRecord:
    "https://app.notion.com/p/7acabd84e8ad4e2b9979a4c1ef41cb47",
  architectureRecord:
    "https://app.notion.com/p/30b41dbeb0c7474b993546dd436496db",
  w13Record: "https://app.notion.com/p/8d198becb97e4f85a0c385c1aaa57d88",
  syncMode: "read-only registry mirror",
} as const;

export const notionWorkers: NotionWorker[] = [
  {
    id: "W-BOOT",
    name: "genesis-hello-worker",
    status: "Enabled",
    owner: "Igor Holt",
    enabledAt: "2026-04-01",
    updatedAt: "2026-04-01",
    domain: "Notion worker smoke test",
  },
  {
    id: "W-02",
    name: "gc-billing-sync",
    status: "Enabled",
    owner: "Igor Holt",
    enabledAt: "2026-04-01",
    updatedAt: "2026-04-01",
    domain: "Billing pipeline",
  },
  {
    id: "W-00",
    name: "gc-conductor",
    status: "Enabled",
    owner: "Igor Holt",
    enabledAt: "2026-04-01",
    updatedAt: "2026-04-01",
    domain: "Master orchestration",
  },
  {
    id: "W-11",
    name: "gc-deploy-tracker",
    status: "Enabled",
    owner: "Igor Holt",
    enabledAt: "2026-04-01",
    updatedAt: "2026-04-01",
    domain: "CI/CD and deployment history",
  },
  {
    id: "W-06",
    name: "gc-etherscan-oracle",
    status: "Enabled",
    owner: "Igor Holt",
    enabledAt: "2026-04-01",
    updatedAt: "2026-04-01",
    domain: "Base L2 on-chain monitoring",
  },
  {
    id: "W-12",
    name: "gc-experiment-tracker",
    status: "Enabled",
    owner: "Igor Holt",
    enabledAt: "2026-04-01",
    updatedAt: "2026-04-01",
    domain: "Research and experiment runs",
  },
  {
    id: "W-04",
    name: "gc-health-sentinel",
    status: "Enabled",
    owner: "Igor Holt",
    enabledAt: "2026-04-01",
    updatedAt: "2026-04-01",
    domain: "Infrastructure health",
  },
  {
    id: "W-09",
    name: "gc-ip-registry",
    status: "Enabled",
    owner: "Igor Holt",
    enabledAt: "2026-04-01",
    updatedAt: "2026-04-01",
    domain: "IP portfolio",
  },
  {
    id: "W-07",
    name: "gc-pareto-growth",
    status: "Enabled",
    owner: "Igor Holt",
    enabledAt: "2026-04-01",
    updatedAt: "2026-04-01",
    domain: "Growth analytics",
  },
  {
    id: "W-03",
    name: "gc-revenue-dash",
    status: "Enabled",
    owner: "Igor Holt",
    enabledAt: "2026-04-01",
    updatedAt: "2026-04-01",
    domain: "Revenue aggregation",
  },
  {
    id: "W-10",
    name: "gc-secret-rotation",
    status: "Enabled",
    owner: "Igor Holt",
    enabledAt: "2026-04-01",
    updatedAt: "2026-04-01",
    domain: "Credential lifecycle",
  },
  {
    id: "W-08",
    name: "gc-stripe-analytics",
    status: "Enabled",
    owner: "Igor Holt",
    enabledAt: "2026-04-01",
    updatedAt: "2026-04-01",
    domain: "Subscription analytics",
  },
  {
    id: "W-05",
    name: "gc-temporal-monitor",
    status: "Enabled",
    owner: "Igor Holt",
    enabledAt: "2026-04-01",
    updatedAt: "2026-04-01",
    domain: "Temporal workflow monitoring",
  },
  {
    id: "W-01",
    name: "gc-wrap-monitor",
    status: "Enabled",
    owner: "Igor Holt",
    enabledAt: "2026-04-01",
    updatedAt: "2026-04-01",
    domain: "wQFLOP wrap execution",
  },
  {
    id: "W-15",
    name: "gc-autofunnel-monitor",
    status: "Enabled",
    owner: "Igor Holt",
    enabledAt: "2026-04-20",
    updatedAt: "2026-04-20",
    domain: "Autofunnel monitoring",
  },
];

export const workerSyncSummary = {
  source: "Notion workers dashboard",
  syncedAt: "2026-04-30",
  total: notionWorkers.length,
  enabled: notionWorkers.filter((worker) => worker.status === "Enabled").length,
  ambientEndpoint: ambientIntegration.endpoint,
  integrationNotes: [
    "W-13 gc-ambient-gateway monitors ambient access and feeds W-00, W-04, W-10, and W-11.",
    "SEAR mirrors the Notion worker roster through read-only site, MCP, and CLI surfaces.",
    "The legacy ambient-mcp-server dist path is not required at runtime; SEAR tracks the deployed MCP endpoint.",
  ],
};

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
  {
    heading: "Notion workers",
    body:
      "Use `sear --json workers` or `/api/workers` to inspect the enabled Notion worker roster and the ambient MCP sync endpoint.",
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
