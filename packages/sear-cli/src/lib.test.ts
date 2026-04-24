import { describe, expect, it, vi } from "vitest";
import { doctor, resolveBaseUrl } from "./lib.js";

describe("resolveBaseUrl", () => {
  it("trims trailing slash", () => {
    expect(resolveBaseUrl("https://sear.example/")).toBe("https://sear.example");
  });
});

describe("doctor", () => {
  it("reports reachable deployments", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({ ok: true }),
      })),
    );

    const result = await doctor("https://sear.example");
    expect(result.reachable).toBe(true);
  });
});
