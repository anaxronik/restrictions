// export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  return Response.json({ asd: 1, method: "get" });
}

export async function POST(request: Request) {
  return Response.json({ asd: 2, method: "post" });
}
