import { productName, productTagline, siteDescription, withSiteUrl } from "@/lib/site";

export async function GET(request: Request) {
  const host = new URL(request.url).host;
  const serversUrl = withSiteUrl("/", host).replace(/\/$/, "");

  const document = {
    openapi: "3.1.0",
    info: {
      title: productName,
      summary: productTagline,
      description: siteDescription,
      version: "1.0.0",
      contact: {
        name: "Igor Holt / Kovach Enterprises",
        url: "https://genesisconductor.io",
      },
    },
    servers: [{ url: serversUrl, description: "Production" }],
    paths: {
      "/api/overview": {
        get: {
          operationId: "getOverview",
          summary: "Product overview JSON",
          responses: {
            "200": {
              description: "Overview payload",
              content: {
                "application/json": {
                  schema: { type: "object", additionalProperties: true },
                },
              },
            },
          },
        },
      },
      "/api/benchmark": {
        get: {
          operationId: "getBenchmark",
          summary: "Latest benchmark snapshot",
          responses: {
            "200": {
              description: "Benchmark results",
              content: {
                "application/json": {
                  schema: { type: "object", additionalProperties: true },
                },
              },
            },
          },
        },
      },
      "/api/mcp": {
        post: {
          operationId: "mcp",
          summary: "Remote MCP endpoint (JSON-RPC / streamable HTTP)",
          responses: {
            "200": { description: "MCP response" },
            "405": { description: "Method not allowed for GET" },
          },
        },
      },
      "/openapi.json": {
        get: {
          operationId: "getOpenApi",
          summary: "This OpenAPI document",
          responses: {
            "200": {
              description: "OpenAPI 3.1 document",
              content: {
                "application/json": {
                  schema: { type: "object", additionalProperties: true },
                },
              },
            },
          },
        },
      },
      "/llms.txt": {
        get: {
          operationId: "getLlmsTxt",
          summary: "LLM-oriented site map",
          responses: {
            "200": {
              description: "Plain text",
              content: { "text/plain": { schema: { type: "string" } } },
            },
          },
        },
      },
      "/robots.txt": {
        get: {
          operationId: "getRobots",
          summary: "Robots directives",
          responses: {
            "200": {
              description: "Plain text",
              content: { "text/plain": { schema: { type: "string" } } },
            },
          },
        },
      },
      "/sitemap.xml": {
        get: {
          operationId: "getSitemapXml",
          summary: "XML sitemap",
          responses: {
            "200": {
              description: "XML",
              content: { "application/xml": { schema: { type: "string" } } },
            },
          },
        },
      },
    },
  };

  return Response.json(document, {
    headers: {
      "cache-control": "public, max-age=300, s-maxage=300",
      "access-control-allow-origin": "*",
    },
  });
}
