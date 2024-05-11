import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCityDto) {
    return this.prisma.city.create({
      data: {
        name: dto.name,
        Country: {
          connect: {
            id: dto.countryId,
          },
        },
      },
    });
  }

  getAll() {
    return this.prisma.city.findMany({
      select: {
        id: true,
        name: true,
        Country: true,
      },
    });
  }
}
