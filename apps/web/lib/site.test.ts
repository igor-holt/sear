import { describe, expect, it } from "vitest";
import { staticRoutes, withSiteUrl } from "./site";

describe("site helpers", () => {
  it("includes the public routes in the sitemap surface", () => {
    expect(staticRoutes).toContain("/");
    expect(staticRoutes).toContain("/benchmarks");
  });

  it("builds absolute URLs", () => {
    expect(withSiteUrl("/docs", "sear.example")).toBe("https://sear.example/docs");
  });
});
