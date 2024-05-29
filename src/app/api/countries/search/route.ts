import { prisma } from "../../../../../prisma/prismaClient";

export type TSearchCountryBody = {
  name: string;
};

export async function POST(request: Request) {
  return request.json().then((body: TSearchCountryBody) => {
    return prisma.country
      .findMany({
        where: {
          name: {
            contains: body.name,
            mode: "insensitive",
          },
        },
        select: {
          name: true,
          id: true,
        },
      })
      .then((result) => Response.json(result));
    return Response.json(body);
  });
}
