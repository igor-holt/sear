import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/workers", () => {
  it("returns the enabled Notion worker roster and ambient sync metadata", async () => {
    const response = await GET();
    const payload = await response.json();

    expect(payload.summary.total).toBe(15);
    expect(payload.summary.enabled).toBe(15);
    expect(payload.ambientIntegration.endpoint).toContain("ambient-mcp-server");
    expect(payload.workers.map((worker: { name: string }) => worker.name)).toContain(
      "gc-autofunnel-monitor",
    );
  });
});
