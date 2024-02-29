import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { PrismaModule } from './prisma/prisma.module';
import { RestrictionsModule } from './restrictions/restrictions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PrismaModule,
    ArticlesModule,
    RestrictionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
