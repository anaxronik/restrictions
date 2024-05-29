import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as XLSX from 'xlsx';
import { SearchTnwedDto } from './dto/search-tnwed.dto';
import { TnwedDto } from './dto/tnwed.dto';

@Injectable()
export class TnwedService {
  constructor(private prisma: PrismaService) {}

  create(dto: TnwedDto) {
    return this.prisma.tnwed.create({
      data: {
        code: dto.code,
        description: dto.description,
      },
    });
  }

  search(dto: SearchTnwedDto) {
    return this.prisma.tnwed.findMany({
      where: {
        OR: [
          {
            code: {
              contains: dto.query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: dto.query,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  findAll() {
    return this.prisma.tnwed.findMany();
  }

  async import(file: Express.Multer.File) {
    try {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheetNames = workbook.SheetNames;

      const codes = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetNames[0]],
      ) as TnwedDto[];
      for await (const code of codes) {
        await this.prisma.tnwed.upsert({
          where: { code: String(code.code) },
          create: { code: String(code.code), description: code.description },
          update: { code: String(code.code), description: code.description },
        });
      }
      return this.prisma.tnwed.count();
    } catch (error) {
      console.error(error);
      return { text: String(error), error };
    }
  }
}
