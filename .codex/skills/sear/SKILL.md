---
name: sear
description: Use when you need to inspect or operate the SEAR deployment through the installed sear CLI, including doctor, overview, benchmarks, sitemap, and read-only raw GET requests.
---

# SEAR

Use the installed `sear` CLI instead of ad hoc curl commands.

## Start

1. Verify the command exists: `command -v sear`
2. Run the safe read path first: `sear --json doctor`
3. If needed, inspect product metadata: `sear --json overview`
4. Then inspect launch proof: `sear --json benchmarks`

## Auth

- No auth is required.
- Override the target with `SEAR_BASE_URL` or `sear --base-url <url> ...`

## Common reads

- Overview: `sear --json overview`
- Benchmarks: `sear --json benchmarks`
- Plain-text sitemap: `sear --json sitemap`

## Raw escape hatch

- Read-only only: `sear --json request get /api/overview`
- Do not add write verbs without explicit user approval.

## Examples

```bash
sear --json doctor
sear --json benchmarks
sear --base-url https://your-deployment.example --json request get /llms.txt
```
