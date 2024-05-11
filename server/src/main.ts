import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  classValidator(app);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  swagger(app);

  await app.listen(port || 3000).then(() => {
    console.log(`=> Application is running on: ${port}`);
    console.log(`=> Swagger started: localhost:${port}`);
  });
}
bootstrap();

function swagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {
    jsonDocumentUrl: 'openapi.json',
  });
}

function classValidator(app: INestApplication<any>) {
  app.useGlobalPipes(new ValidationPipe());
}
