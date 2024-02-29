import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountriesService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  create(dto: CreateCountryDto) {
    return this.prisma.country.upsert({
      where: { name: dto.name },
      update: { name: dto.name },
      create: { name: dto.name },
    });
  }

  async findAll() {
    return this.prisma.country.findMany();
  }

  search(dto: CreateCountryDto) {
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
