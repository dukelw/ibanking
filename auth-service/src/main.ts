/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Cấu hình CORS
  app.enableCors({
    origin: [
      'http://localhost:3000', // frontend local
      process.env.CLIENT, // domain từ env
    ],
    credentials: true, // nếu cần gửi cookie/token
  });

  const config = new DocumentBuilder()
    .setTitle('Auth Service')
    .setDescription('API docs for Auth microservice')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 4001;
  await app.listen(port);

  console.log(`🚀 Auth service is running on: http://localhost:${port}`);
  console.log(
    `📘 Auth Swagger docs: http://localhost:${port}/api/docs`,
  );
}
bootstrap();
