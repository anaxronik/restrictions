import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CountriesModule } from './countries/countries.module';
import { PrismaModule } from './prisma/prisma.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CountriesModule,
    CitiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
