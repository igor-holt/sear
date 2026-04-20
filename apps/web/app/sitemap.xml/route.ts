import { staticRoutes, withSiteUrl } from "@/lib/site";

export async function GET(request: Request) {
  const host = new URL(request.url).host;
  const entries = staticRoutes
    .map(
      (route) => `<url><loc>${withSiteUrl(route, host)}</loc><changefreq>${
        route === "/" ? "weekly" : "monthly"
      }</changefreq><priority>${route === "/" ? "1.0" : "0.7"}</priority></url>`,
    )
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`,
    {
      headers: {
        "content-type": "application/xml; charset=utf-8",
      },
    },
  );
}
