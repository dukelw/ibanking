import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT ?? 4002;
  await app.listen(port);

  console.log(`🚀 Auth service is running on: http://localhost:${port}`);
}
bootstrap();
