import { ContragentType, Country } from "@prisma/client";
import { prisma } from "../../../../../prisma/prismaClient";

export async function POST(request: Request) {
  return request.json().then((body: TSearchRestrictionsRequestBody) => {
    return prisma.restriction
      .findMany({
        where: {
          OR: [
            {
              filter__senderType: {
                equals: [],
              },
            },
            {
              filter__senderType: {
                hasSome: body.senderTypes,
              },
            },
          ],
        },
      })
      .then((result) => {
        return Response.json(result);
      });
  });
}

export type TSearchRestrictionsRequestBody = {
  countryIds?: String[];
  senderTypes?: ContragentType[];
};

export type TSearchRestrictionsResponseBody = {
  items: TRestrictionItem[];
};

export type TRestrictionItem = {
  filter: {
    countries: Country[];
  };
  data: {
    comment?: string;
  };
};
