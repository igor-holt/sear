import { glamaConnector } from "@/lib/discovery";

export async function GET() {
  return Response.json(glamaConnector, {
    headers: {
      "cache-control": "public, max-age=300, s-maxage=300",
    },
  });
}
