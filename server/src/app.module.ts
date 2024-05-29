import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TnwedModule } from './tnwed/tnwed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TnwedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
