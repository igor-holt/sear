import { staticRoutes, withSiteUrl } from "@/lib/site";

export async function GET(request: Request) {
  const host = new URL(request.url).host;
  const body = [...staticRoutes, "/llms.txt", "/robots.txt", "/sitemap.xml"]
    .map((route) => withSiteUrl(route, host))
    .join("\n");

  return new Response(`${body}\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
