import { prisma } from "../../../../prisma/prismaClient";

export async function GET(request: Request) {
  return prisma.city
    .findMany({
      select: {
        name: true,
        id: true,
        country: true,
      },
    })
    .then((result) => {
      return Response.json(result);
    });
}

export type TCreateCityBody = {
  name: string;
  countryId: number;
};
export async function POST(request: Request) {
  return request.json().then((body: TCreateCityBody) =>
    prisma.city
      .create({
        data: {
          name: body.name,
          country: {
            connect: {
              id: body.countryId,
            },
          },
        },
      })
      .then((result) => Response.json(result))
  );
}
