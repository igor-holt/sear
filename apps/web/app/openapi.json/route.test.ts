import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /openapi.json", () => {
  it("returns OpenAPI 3.x JSON", async () => {
    const res = await GET(new Request("https://sear.genesisconductor.io/openapi.json"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.openapi).toMatch(/^3\./);
    expect(body.info?.title).toBe("SEAR");
    expect(body.paths?.["/api/overview"]).toBeTruthy();
  });
});
