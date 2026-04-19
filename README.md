# SEAR

SEAR is the Self Evolving Agent Retrainer: a public launch surface, a read-only ChatGPT app via MCP, and an installable CLI for operator-grade release inspection.

## What ships

- `apps/web`: Next.js 16 site with SEO metadata, `robots.txt`, `sitemap.xml`, `sitemap.txt`, `llms.txt`, benchmark pages, and a remote MCP endpoint at `/api/mcp`
- `packages/sear-cli`: installable `sear` CLI with `doctor`, `overview`, `benchmarks`, `sitemap`, and raw `request get`
- `.codex/skills/sear`: companion skill for future Codex threads

## Local workflow

```bash
pnpm install
pnpm build
pnpm test
pnpm bench
pnpm install:cli
```

## ChatGPT app

The remote MCP endpoint is exposed at `/api/mcp`. Connect it from ChatGPT developer mode over HTTPS after deployment.
