import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TnwedController } from './tnwed.controller';
import { TnwedService } from './tnwed.service';

@Module({
  controllers: [TnwedController],
  providers: [TnwedService, PrismaService],
})
export class TnwedModule {}
