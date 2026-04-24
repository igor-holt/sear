import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /llms.txt", () => {
  it("publishes machine-readable entry points", async () => {
    const response = await GET(new Request("https://sear.example/llms.txt"));
    const body = await response.text();

    expect(body).toContain("/api/mcp");
    expect(body).toContain("SEAR");
  });
});
