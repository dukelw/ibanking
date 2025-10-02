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
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Cấu hình CORS
  app.enableCors({
    origin: [
      'http://localhost:3000', // frontend local
      process.env.CLIENT, // domain từ env
    ],
    credentials: true, // nếu cần gửi cookie/token
  });

  const port = process.env.PORT ?? 4001;
  await app.listen(port);

  console.log(`🚀 Transaction service running: http://localhost:${port}`);
  console.log(`📘 Transaction Swagger docs: http://localhost:${port}/api/docs`);
}
bootstrap();
