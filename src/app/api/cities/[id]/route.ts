import { prisma } from "../../../../../prisma/prismaClient";

export async function DELETE(_: Request, { params }: any) {
  return prisma.city
    .delete({
      where: {
        id: parseInt(params.id),
      },
    })
    .then((result) => Response.json(result));
}
