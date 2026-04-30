import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/overview", () => {
  it("returns product metadata", async () => {
    const response = await GET();
    const payload = await response.json();

    expect(payload.productName).toBe("SEAR");
    expect(Array.isArray(payload.features)).toBe(true);
    expect(payload.notionWorkerCount).toBe(15);
    expect(payload.ambientIntegration.endpoint).toContain("ambient-mcp-server");
  });
});
