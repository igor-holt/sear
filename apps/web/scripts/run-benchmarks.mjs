import autocannon from "autocannon";
import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";
import { spawn } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(__dirname, "..");
const outputFile = resolve(appRoot, "data/benchmarks.json");
const port = 4011;
const baseUrl = `http://127.0.0.1:${port}`;

async function waitFor(url) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {}

    await sleep(500);
  }

  throw new Error(`Timed out waiting for ${url}`);
}

function runAutocannon(url) {
  return new Promise((resolveBench, rejectBench) => {
    autocannon(
      {
        url,
        connections: 10,
        duration: 5,
        headers: {
          accept: "application/json,text/html",
        },
      },
      (error, result) => {
        if (error) {
          rejectBench(error);
          return;
        }

        resolveBench(result);
      },
    );
  });
}

async function inspect(url) {
  const response = await fetch(url);
  const text = await response.text();

  return {
    ok: response.ok,
    transferredBytes: Buffer.byteLength(text, "utf8"),
  };
}

const server = spawn("pnpm", ["exec", "next", "start", "--port", String(port)], {
  cwd: appRoot,
  env: { ...process.env, PORT: String(port) },
  stdio: ["ignore", "pipe", "pipe"],
});

server.stdout.on("data", (chunk) => process.stderr.write(chunk));
server.stderr.on("data", (chunk) => process.stderr.write(chunk));

try {
  await waitFor(`${baseUrl}/api/overview`);

  const targets = [
    { label: "Home page", path: "/" },
    { label: "Benchmarks API", path: "/api/benchmark" },
    { label: "Overview API", path: "/api/overview" },
  ];

  const results = [];

  for (const target of targets) {
    const benchmark = await runAutocannon(`${baseUrl}${target.path}`);
    const payload = await inspect(`${baseUrl}${target.path}`);

    results.push({
      label: target.label,
      path: target.path,
      latencyTailMs: Number(
        (benchmark.latency.p97_5 ?? benchmark.latency.p90 ?? benchmark.latency.average).toFixed(2),
      ),
      requestsPerSec: Number(benchmark.requests.average.toFixed(2)),
      throughputKbPerSec: Number((benchmark.throughput.average / 1024).toFixed(2)),
      transferredBytes: payload.transferredBytes,
    });
  }

  const robots = await fetch(`${baseUrl}/robots.txt`);
  const sitemapTxt = await fetch(`${baseUrl}/sitemap.txt`);
  const llmsTxt = await fetch(`${baseUrl}/llms.txt`);

  const snapshot = {
    generatedAt: new Date().toISOString(),
    scenario: "local-preview",
    results,
    artifacts: {
      robots: robots.ok,
      sitemapTxt: sitemapTxt.ok,
      llmsTxt: llmsTxt.ok,
    },
  };

  await writeFile(outputFile, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(snapshot, null, 2));
} finally {
  server.kill("SIGTERM");
}
