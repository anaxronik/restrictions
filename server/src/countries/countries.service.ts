import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
    return this.prisma.country.findMany();
  }

  remove(id: string) {
    return this.prisma.country.delete({ where: { id } });
  }

  find(dto: CreateCountryDto) {
    console.log({ body: dto });

    return this.prisma.country.findMany({
      where: {
        name: {
          contains: dto.name,
          mode: 'insensitive',
        },
      },
    });
  }
}
