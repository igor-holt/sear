import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /.well-known/mcp/server-card.json", () => {
  it("publishes a crawler-friendly server card", async () => {
    const response = await GET();
    const payload = await response.json();

    expect(payload.serverInfo.name).toBe("SEAR");
    expect(payload.authentication.required).toBe(false);
    expect(payload.tools.map((tool: { name: string }) => tool.name)).toContain("sear_benchmarks");
  });
});
