import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /server.json", () => {
  it("publishes official MCP registry metadata", async () => {
    const response = await GET();
    const payload = await response.json();

    expect(payload.name).toBe("io.github.igor-holt/sear");
    expect(payload.remotes[0].url).toBe("https://sear.genesisconductor.io/api/mcp");
    expect(payload.remotes[0].type).toBe("streamable-http");
  });
});
