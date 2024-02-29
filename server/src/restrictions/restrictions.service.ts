import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateRestrictionDto,
  CreateRestrictionsFilterDto,
} from './dto/create-restriction.dto';

@Injectable()
export class RestrictionsService {
  filterKeyOrder: string[] = [
    'countries',
    'borderCrossingTypes',
    'contragentTypes',
    'transportationTypes',
  ];

  constructor(private prisma: PrismaService) {}

  create(dto: CreateRestrictionDto) {
    return this.prisma.restriction
      .create({
        data: {
          countries: removeDuplicatesAndSort(dto.filter.countries),
          borderCrossingTypes: removeDuplicatesAndSort(
            dto.filter.borderCrossingTypes,
          ),
          contragentTypes: removeDuplicatesAndSort(dto.filter.contragentTypes),
          transportationTypes: removeDuplicatesAndSort(
            dto.filter.transportationTypes,
          ),

          ...dto.data,
        },
      })
      .then(this.resultToStruct);
  }

  findAll() {
    return this.prisma.restriction.findMany().then((items) => {
      return items.map(this.resultToStruct);
    });
  }

  count() {
    return this.prisma.restriction.count();
  }

  /** Ищет запрет по строгому соответствию фильтру */
  findByFilter = (dto: CreateRestrictionsFilterDto) => {
    return this.prisma.restriction
      .findFirst({
        where: {
          AND: [
            { countries: getFilter(dto.countries) },
            { borderCrossingTypes: getFilter(dto.borderCrossingTypes) },
            { contragentTypes: getFilter(dto.contragentTypes) },
            { transportationTypes: getFilter(dto.transportationTypes) },
          ],
        },
      })
      .then((res) => {
        return res;
      });
  };

  findOrCreateByFilter = (dto: CreateRestrictionDto) => {
    return this.findByFilter(dto.filter).then(async (result) => {
      if (result) return this.update(result.id, dto);
      return this.create(dto);
    });
  };

  update = (id: number, data: CreateRestrictionDto) => {
    return this.prisma.restriction
      .update({
        where: {
          id,
        },
        data: {
          ...data.data,
          id: id,
          countries: removeDuplicatesAndSort(data.filter.countries),
          borderCrossingTypes: removeDuplicatesAndSort(
            data.filter.borderCrossingTypes,
          ),
          contragentTypes: removeDuplicatesAndSort(data.filter.contragentTypes),
          transportationTypes: removeDuplicatesAndSort(
            data.filter.transportationTypes,
          ),
        },
      })
      .then((res) => {
        console.log('===> DONE', res);

        return this.resultToStruct(res);
      })
      .finally(() => {
        console.log('updated');
      });
  };

  resultToStruct = (obj: Record<string, unknown>) => {
    const result = {
      id: 0,
      filter: {},
      data: {},
    };
    Object.keys(obj).forEach((key) => {
      if (key === 'id') {
        result.id = obj[key] as number;
      } else if (this.filterKeyOrder.includes(key)) {
        result.filter[key] = obj[key];
      } else {
        result.data[key] = obj[key];
      }
    });
    return result;
  };

  removeAll = () => {
    console.log('remove all');

    this.prisma.restriction.deleteMany({}).then((result) => {
      console.log('===x DONE', result);
    });
  };
}

const removeDuplicatesAndSort = (arr?: string[]) => {
  if (!arr) return [];
  return arr
    .filter((item, index) => arr.indexOf(item) === index)
    .sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
};

const getFilter = (arr?: any[]) => {
  if (!arr) return { isEmpty: true };
  return { equals: removeDuplicatesAndSort(arr) };
};
