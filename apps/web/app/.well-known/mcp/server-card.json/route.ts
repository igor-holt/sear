import { smitheryServerCard } from "@/lib/discovery";

export async function GET() {
  return Response.json(smitheryServerCard, {
    headers: {
      "cache-control": "public, max-age=300, s-maxage=300",
    },
  });
}
