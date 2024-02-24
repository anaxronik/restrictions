import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.development.env',
    }),
    UsersModule,
    PrismaModule,
    ArticlesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
