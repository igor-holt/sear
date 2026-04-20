import { withSiteUrl } from "@/lib/site";

export async function GET(request: Request) {
  const host = new URL(request.url).host;
  const body = `User-Agent: *\nAllow: /\n\nSitemap: ${withSiteUrl("/sitemap.xml", host)}\n`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
