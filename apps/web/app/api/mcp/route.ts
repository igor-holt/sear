import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createSearMcpServer } from "./server";

export const runtime = "nodejs";

function jsonRpcError(status: number, message: string) {
  return Response.json(
    {
      jsonrpc: "2.0",
      error: { code: -32000, message },
      id: null,
    },
    { status },
  );
}

async function handle(request: Request) {
  try {
    const origin = new URL(request.url).origin;
    const server = createSearMcpServer(origin);
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    await server.connect(transport);
    return await transport.handleRequest(request);
  } catch (error) {
    return jsonRpcError(
      500,
      error instanceof Error ? error.message : "Internal server error",
    );
  }
}

export async function POST(request: Request) {
  return handle(request);
}

export async function GET() {
  return jsonRpcError(405, "Method not allowed.");
}

export async function DELETE() {
  return jsonRpcError(405, "Method not allowed.");
}
