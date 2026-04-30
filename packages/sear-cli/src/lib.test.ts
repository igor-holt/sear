import { afterEach, describe, expect, it, vi } from "vitest";
import { doctor, resolveBaseUrl, workers } from "./lib.js";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("resolveBaseUrl", () => {
  it("defaults to the live SEAR deployment", () => {
    expect(resolveBaseUrl()).toBe("https://sear.genesisconductor.io");
  });

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

describe("workers", () => {
  it("fetches the worker roster endpoint", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => ({
        ok: true,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({ requestedUrl: url }),
      })),
    );

    const result = await workers("https://sear.example");
    expect(result.payload).toEqual({
      requestedUrl: "https://sear.example/api/workers",
    });
  });
});
