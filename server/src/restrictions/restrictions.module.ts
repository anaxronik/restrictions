import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RestrictionsController } from './restrictions.controller';
import { RestrictionsService } from './restrictions.service';

@Module({
  controllers: [RestrictionsController],
  providers: [RestrictionsService],
  imports: [PrismaModule],
})
export class RestrictionsModule {}
