#!/usr/bin/env node
import { Command } from "commander";
import { benchmarks, doctor, overview, rawGet, sitemap, toHuman } from "./lib.js";

function emit(json: boolean, label: string, value: unknown) {
  if (json) {
    process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
    return;
  }

  process.stdout.write(`${toHuman(label, value)}\n`);
}

async function run(action: () => Promise<unknown>, json: boolean, label: string) {
  try {
    const value = await action();
    emit(json, label, value);
  } catch (error) {
    if (json) {
      process.stdout.write(
        `${JSON.stringify(
          {
            error: error instanceof Error ? error.message : String(error),
          },
          null,
          2,
        )}\n`,
      );
    } else {
      process.stderr.write(
        `${error instanceof Error ? error.message : String(error)}\n`,
      );
    }

    process.exitCode = 1;
  }
}

const program = new Command();

program
  .name("sear")
  .description("Inspect a SEAR site or deployment from any repository.")
  .option("--json", "Emit machine-readable JSON")
  .option("--base-url <url>", "Override SEAR base URL");

program
  .command("doctor")
  .description("Verify base URL configuration and overview reachability")
  .action(async () => {
    const options = program.opts<{ json?: boolean; baseUrl?: string }>();
    await run(() => doctor(options.baseUrl), Boolean(options.json), "doctor");
  });

program
  .command("overview")
  .description("Fetch the public SEAR overview payload")
  .action(async () => {
    const options = program.opts<{ json?: boolean; baseUrl?: string }>();
    await run(() => overview(options.baseUrl), Boolean(options.json), "overview");
  });

program
  .command("benchmarks")
  .description("Fetch the current SEAR benchmark snapshot")
  .action(async () => {
    const options = program.opts<{ json?: boolean; baseUrl?: string }>();
    await run(
      () => benchmarks(options.baseUrl),
      Boolean(options.json),
      "benchmarks",
    );
  });

program
  .command("sitemap")
  .description("Fetch the plain-text sitemap surface")
  .action(async () => {
    const options = program.opts<{ json?: boolean; baseUrl?: string }>();
    await run(() => sitemap(options.baseUrl), Boolean(options.json), "sitemap");
  });

const request = program.command("request").description("Raw escape hatch for read-only GET requests");

request
  .command("get")
  .argument("<path>", "Path relative to the SEAR base URL")
  .description("Issue a GET request against the configured SEAR base URL")
  .action(async (path: string) => {
    const options = program.opts<{ json?: boolean; baseUrl?: string }>();
    await run(
      () => rawGet(path, options.baseUrl),
      Boolean(options.json),
      "request",
    );
  });

program.parseAsync(process.argv);
