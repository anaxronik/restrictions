import { prisma } from "../../../../../prisma/prismaClient";

export async function DELETE(_: Request, { params }: any) {
  return prisma.country
    .delete({
      where: {
        id: params.id,
      },
    })
    .then((result) => Response.json(result));
}
