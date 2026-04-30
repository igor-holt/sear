import serverDefinition from "../../../../server.json";

export async function GET() {
  return Response.json(serverDefinition, {
    headers: {
      "cache-control": "public, max-age=300, s-maxage=300",
    },
  });
}
