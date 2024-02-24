import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        name: dto.name,
      },
    });
  }

  findBy = (dto: Partial<CreateUserDto>) => {
    return this.prisma.user.findFirst({
      where: {
        name: {
          equals: dto.name,
          mode: 'insensitive',
        },
      },
    });
  };

  findAll() {
    return this.prisma.user.findMany();
  }
}
