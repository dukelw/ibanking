import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Student Service')
    .setDescription('API docs for Student microservice')
    .setVersion(  '1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 4001;
  await app.listen(port);

  console.log(`🚀 Student service running: http://localhost:${port}`);
  console.log(
    `📘 Student Swagger docs: http://localhost:${port}/api/docs`,
  );
}
bootstrap();
