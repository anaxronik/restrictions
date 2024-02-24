import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  SwaggerModule.setup(
    '/',
    app,
    SwaggerModule.createDocument(app, new DocumentBuilder().build()),
  );
  await app.listen(port || 3000);
  console.log(`=> Application is running on: ${port}`);
  console.log(`=> Swagger started: localhost:${port}`);
}
bootstrap();
