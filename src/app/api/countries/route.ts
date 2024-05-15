// export const dynamic = "force-dynamic"; // defaults to auto

import { prisma } from "../../../../prisma/prismaClient";

export async function GET(request: Request) {
  return prisma.country.findMany().then((result) => {
    return Response.json(result);
  });
}

export async function POST(request: Request) {
  return Response.json({ asd: 2, method: "post" });
}
