import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { setupSwagger } from './swagger-combined';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', process.env.CLIENT],
    credentials: true,
  });
  await setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `🚀 API Gateway running at http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `🚀 API Swagger is running at http://localhost:${process.env.PORT ?? 3000}/api/docs`,
  );
}
bootstrap();
