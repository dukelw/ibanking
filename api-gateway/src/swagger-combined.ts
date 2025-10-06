import * as fs from 'fs';
import * as path from 'path';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import axios from 'axios';

export async function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('IBanking Documentation')
    .setDescription('Combined API Docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  document.paths = document.paths || {};
  document.components = document.components || {};
  document.components.schemas = document.components.schemas || {};

  const services = [
    process.env.USER_SWAGGER_URL,
    process.env.TRANSACTION_SWAGGER_URL,
    process.env.STUDENT_SWAGGER_URL,
    process.env.NOTIFICATION_SWAGGER_URL,
  ];

  for (const base of services) {
    try {
      const { data } = await axios.get(`${base}/api/docs-json`);
      if (data?.paths) Object.assign(document.paths, data.paths);
      if (data?.components?.schemas)
        Object.assign(document.components.schemas, data.components.schemas);
    } catch (err) {
      console.warn(`⚠️ Could not load Swagger from ${base}`);
    }
  }

  // 🟩 Lưu file JSON tại thư mục gốc project
  const outputPath = path.join(process.cwd(), 'ibanking-swagger.json');
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
  console.log(`✅ Combined Swagger saved to ${outputPath}`);

  SwaggerModule.setup('api/docs', app, document);
}
