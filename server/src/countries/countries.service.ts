import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as XLSX from 'xlsx';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  create(createCountryDto: CreateCountryDto) {
    return this.prisma.country.create({
      data: { name: createCountryDto.name },
    });
  }

  findAll() {
    return this.prisma.country.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  remove(id: string) {
    return this.prisma.country.delete({ where: { id } });
  }

  find(dto: CreateCountryDto) {
    return this.prisma.country.findMany({
      where: {
        name: {
          contains: dto.name,
          mode: 'insensitive',
        },
      },
    });
  }

  async import(file: Express.Multer.File) {
    try {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheetNames = workbook.SheetNames;

      const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]) as {
        id: string | number;
        Название: string;
      }[];
      const addedResult: { name: string; added: boolean }[] = [];
      for await (const i of data) {
        await this.prisma.country
          .findFirstOrThrow({
            where: {
              name: {
                contains: i.Название,
                mode: 'insensitive',
              },
            },
          })
          .then(() => {
            return addedResult.push({
              name: i.Название,
              added: false,
            });
          })
          .catch(() => {
            return this.create({
              name: i.Название,
            }).then(() => {
              addedResult.push({
                name: i.Название,
                added: true,
              });
            });
          });
      }

      return addedResult;
    } catch (error) {
      return { text: String(error), error };
    }
  }
}
