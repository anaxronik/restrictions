import { sortFilterValues } from "@/utils/sortFilterValues/sortFilterValues";
import { BorderCrossingType, CargoType, ContragentType } from "@prisma/client";
import { prisma } from "../../../../prisma/prismaClient";

export async function GET(request: Request) {
  return prisma.restriction.findMany().then((result) => {
    return Response.json(result);
  });
}

export type TRestrictionFilter = {
  countries: number[];
  senderType: ContragentType[];
  receiverType: ContragentType[];
  cargoType: CargoType[];
  borderCrossingType: BorderCrossingType[];
};

export type TCreateRestrictionRequestBody = {
  filter: TRestrictionFilter;
  data: {
    comment?: string;
  };
};
export async function POST(request: Request) {
  return request.json().then((requestBody: TCreateRestrictionRequestBody) => {
    const sortedFilter = sortFilterValues<TRestrictionFilter>(
      requestBody.filter
    );
    return prisma.restriction
      .findFirstOrThrow({
        where: {
          filter__countries: {
            every: {
              id: {
                in: sortedFilter.countries,
              },
            },
          },
          filter__borderCrossingType: {
            equals: sortedFilter.borderCrossingType,
          },
          filter__cargoType: {
            equals: sortedFilter.cargoType,
          },
          filter__receiverType: {
            equals: sortedFilter.receiverType,
          },
          filter__senderType: {
            equals: sortedFilter.senderType,
          },
        },
      })
      .then((existed) => {
        return prisma.restriction
          .update({
            where: {
              id: existed.id,
            },
            data: {
              data__comment: requestBody.data.comment || undefined,
            },
          })
          .then((result) => {
            return Response.json(result);
          });
      })
      .catch(() => {
        return prisma.restriction
          .create({
            data: {
              filter__countries: {
                connect: sortedFilter.countries.map((id) => ({ id })),
              },
              filter__borderCrossingType: {
                set: sortedFilter.borderCrossingType,
              },
              filter__cargoType: {
                set: sortedFilter.cargoType,
              },
              filter__receiverType: {
                set: sortedFilter.receiverType,
              },
              filter__senderType: {
                set: sortedFilter.senderType,
              },

              data__comment: requestBody.data.comment,
            },
          })
          .then((result) => {
            const response: TCreateRestrictionResponseBody = {
              id: result.id,
              filter: {
                countries: sortedFilter.countries,
                senderType: sortedFilter.senderType,
                receiverType: sortedFilter.receiverType,
                cargoType: sortedFilter.cargoType,
                borderCrossingType: sortedFilter.borderCrossingType,
              },
              data: {
                comment: result.data__comment || undefined,
              },
            };
            return Response.json(response);
          });
      });
  });
}
export type TCreateRestrictionResponseBody = {
  id: string;
  filter: TRestrictionFilter;
  data: {
    comment?: string;
  };
};
