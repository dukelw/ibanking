import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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

  const port = process.env.PORT ?? 4001;
  await app.listen(port);

  console.log(`🚀 Student service is running on: http://localhost:${port}`);
}
bootstrap();
