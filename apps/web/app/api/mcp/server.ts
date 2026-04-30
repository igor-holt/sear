import { registerAppResource, registerAppTool } from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
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

const widgetUri = "ui://widget/sear-release-v1.html";

function renderWidget(origin: string) {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SEAR</title>
    <style>
      :root { color-scheme: light; font-family: ui-sans-serif, system-ui, sans-serif; }
      body { margin: 0; background: #f7f2e6; color: #13201d; }
      main { padding: 18px; display: grid; gap: 12px; }
      .card { border-radius: 18px; border: 1px solid rgba(19,32,29,.12); background: rgba(255,250,242,.92); padding: 16px; }
      .eyebrow { font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: #5c6862; }
      h1,h2 { margin: 8px 0 0; line-height: 1; }
      ul { padding-left: 18px; color: #46524c; }
      button { border: 0; border-radius: 999px; padding: 10px 14px; background: #164e63; color: white; cursor: pointer; }
      .stats { display: grid; gap: 10px; }
      .row { display: flex; justify-content: space-between; gap: 12px; padding: 10px 12px; border-radius: 14px; background: #fffaf0; }
      code { font-size: 12px; }
    </style>
  </head>
  <body>
    <main>
      <section class="card">
        <p class="eyebrow">SEAR widget</p>
        <h1>${productName}</h1>
        <p>${productTagline}</p>
      </section>
      <section id="content" class="card">
        <p>Waiting for tool data...</p>
      </section>
      <section class="card">
        <p class="eyebrow">UI action</p>
        <button id="benchmarks">Load benchmarks</button>
      </section>
    </main>
    <script>
      const contentNode = document.getElementById("content");
      const render = (data) => {
        if (!data) return;
        const stats = Array.isArray(data.stats)
          ? '<div class="stats">' + data.stats.map((item) => '<div class="row"><span>' + item.label + '</span><strong>' + item.value + '</strong></div>').join('') + '</div>'
          : "";
        const benchmarks = Array.isArray(data.results)
          ? '<ul>' + data.results.map((item) => '<li><code>' + item.path + '</code> · ' + item.latencyTailMs + ' ms tail · ' + item.requestsPerSec + ' req/s</li>').join('') + '</ul>'
          : "";
        const checklist = Array.isArray(data.checklist)
          ? '<ul>' + data.checklist.map((item) => '<li>' + item + '</li>').join('') + '</ul>'
          : "";
        const workers = Array.isArray(data.workers)
          ? '<ul>' + data.workers.map((item) => '<li><code>' + item.id + '</code> ' + item.name + ' · ' + item.status + '</li>').join('') + '</ul>'
          : "";
        contentNode.innerHTML = [
          data.title ? '<p class="eyebrow">' + data.title + '</p>' : '',
          data.summary ? '<h2>' + data.summary + '</h2>' : '',
          data.description ? '<p>' + data.description + '</p>' : '',
          stats,
          benchmarks,
          checklist,
          workers
        ].join('');
      };

      window.addEventListener("message", (event) => {
        if (event.source !== window.parent) return;
        const message = event.data;
        if (!message || message.jsonrpc !== "2.0") return;
        if (message.method !== "ui/notifications/tool-result") return;
        render(message.params?.structuredContent);
      }, { passive: true });

      document.getElementById("benchmarks").addEventListener("click", () => {
        window.parent.postMessage({
          jsonrpc: "2.0",
          id: "load-benchmarks",
          method: "tools/call",
          params: {
            name: "sear_benchmarks",
            arguments: { view: "full" }
          }
        }, "${origin}");
      });
    </script>
  </body>
</html>`.trim();
}

export function createSearMcpServer(origin: string) {
  const server = new McpServer({
    name: "sear-mcp",
    version: "0.1.0",
  });

  registerAppResource(server, "sear-release", widgetUri, {}, async () => ({
    contents: [
      {
        uri: widgetUri,
        text: renderWidget(origin),
        _meta: {
          ui: {
            prefersBorder: true,
            domain: origin,
            csp: {
              connectDomains: [origin],
              resourceDomains: [origin],
            },
          },
        },
      },
    ],
  }));

  registerAppTool(
    server,
    "sear_overview",
    {
      title: "Show SEAR overview",
      description:
        "Use this when you need a concise summary of what SEAR ships and why it exists.",
      inputSchema: {
        audience: z.enum(["operator", "founder", "reviewer"]).default("operator"),
      },
      annotations: {
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
      _meta: {
        ui: { resourceUri: widgetUri },
        "openai/toolInvocation/invoking": "Loading SEAR overview…",
        "openai/toolInvocation/invoked": "SEAR overview ready.",
      },
    },
    async ({ audience }) => ({
      structuredContent: {
        title: `${audience} view`,
        summary: `${productName} ships a benchmarked launch surface.`,
        description: siteDescription,
        stats: productStats,
        checklist: launchChecklist,
      },
      content: [
        {
          type: "text",
          text: `${productName} combines a public site, a read-only MCP app, and a CLI for launch operations.`,
        },
      ],
      _meta: {
        audience,
        features: featureCards,
      },
    }),
  );

  registerAppTool(
    server,
    "sear_benchmarks",
    {
      title: "Show SEAR benchmarks",
      description:
        "Use this when you need measured latency, throughput, or visibility artifact status for SEAR.",
      inputSchema: {
        view: z.enum(["summary", "full"]).default("summary"),
      },
      annotations: {
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
      _meta: {
        ui: { resourceUri: widgetUri },
        "openai/toolInvocation/invoking": "Measuring SEAR posture…",
        "openai/toolInvocation/invoked": "SEAR benchmarks ready.",
      },
    },
    async ({ view }) => ({
      structuredContent: {
        title: "benchmark snapshot",
        summary: benchmarkSummary.scenario,
        description: `Generated at ${benchmarkSummary.generatedAt ?? "pending"}.`,
        results: view === "full" ? benchmarkSummary.results : benchmarkSummary.results.slice(0, 2),
        stats: [
          {
            label: "artifact coverage",
            value: `${Object.values(benchmarkSummary.artifacts).filter(Boolean).length}/3`,
          },
        ],
      },
      content: [
        {
          type: "text",
          text: benchmarkSummary.results.length
            ? `SEAR currently exposes ${benchmarkSummary.results.length} measured benchmark targets.`
            : "SEAR benchmark data has not been generated yet. Run the local benchmark harness first.",
        },
      ],
      _meta: benchmarkSummary,
    }),
  );

  registerAppTool(
    server,
    "sear_cli_help",
    {
      title: "Show SEAR CLI commands",
      description:
        "Use this when you need the safe first commands for verifying or querying a SEAR deployment from the terminal.",
      annotations: {
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
      _meta: {
        ui: { resourceUri: widgetUri },
      },
    },
    async () => ({
      structuredContent: {
        title: "cli path",
        summary: "Install globally, then start with doctor.",
        description: "SEAR CLI is designed for future Codex threads and shell automation.",
        checklist: [
          "sear --json doctor",
          "sear --json overview",
          "sear --json benchmarks",
          "sear --json request get /api/overview",
        ],
      },
      content: [
        {
          type: "text",
          text: "Start with `sear --json doctor`, then use the read-only commands to inspect overview and benchmark data.",
        },
      ],
    }),
  );

  registerAppTool(
    server,
    "sear_notion_workers",
    {
      title: "Show Notion worker sync",
      description:
        "Use this when you need the enabled Genesis Conductor Notion worker roster and ambient MCP integration status.",
      inputSchema: {
        includeAmbient: z.boolean().default(true),
      },
      annotations: {
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
      _meta: {
        ui: { resourceUri: widgetUri },
        "openai/toolInvocation/invoking": "Loading Notion worker roster…",
        "openai/toolInvocation/invoked": "Notion worker roster ready.",
      },
    },
    async ({ includeAmbient }) => ({
      structuredContent: {
        title: "notion worker sync",
        summary: `${workerSyncSummary.enabled}/${workerSyncSummary.total} Notion workers enabled.`,
        description:
          "SEAR mirrors the Genesis Conductor Notion worker roster for read-only release inspection.",
        stats: [
          { label: "enabled workers", value: String(workerSyncSummary.enabled) },
          { label: "ambient mcp", value: includeAmbient ? "linked" : "hidden" },
        ],
        workers: notionWorkers,
      },
      content: [
        {
          type: "text",
          text: `SEAR tracks ${workerSyncSummary.total} enabled Notion workers and links ambient MCP at ${ambientIntegration.endpoint}.`,
        },
      ],
      _meta: {
        ambientIntegration: includeAmbient ? ambientIntegration : undefined,
        sync: workerSyncSummary,
      },
    }),
  );

  return server;
}
