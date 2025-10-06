import * as fs from 'fs';
import * as path from 'path';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import axios from 'axios';

async function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithRetries(url: string, tries = 5, delayMs = 1000) {
  for (let i = 0; i < tries; i++) {
    try {
      const { data } = await axios.get(url, { timeout: 3000 });
      return data;
    } catch (err) {
      if (i === tries - 1) throw err;
      await wait(delayMs);
    }
  }
  throw new Error('unreachable');
}

export async function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('IBanking Documentation')
    .setDescription('Combined API Docs')
    .setVersion('1.0')
    .build();

  const document: any = SwaggerModule.createDocument(app, config);

  document.paths = document.paths || {};
  document.components = document.components || {};
  document.components.schemas = document.components.schemas || {};

  const services = [
    process.env.USER_SWAGGER_URL,
    process.env.TRANSACTION_SWAGGER_URL,
    process.env.STUDENT_SWAGGER_URL,
    process.env.NOTIFICATION_SWAGGER_URL,
  ].filter(Boolean) as string[];

  for (const base of services) {
    const endpointsToTry = [`${base}/api/docs-json`];

    let loaded = false;
    for (const url of endpointsToTry) {
      try {
        console.log(`➡️ Trying to load swagger from: ${url}`);
        const data: any = await fetchWithRetries(url, 4, 1000);
        if (data?.paths) {
          // merge with simple duplicate check
          for (const [p, v] of Object.entries(data.paths)) {
            if (!document.paths[p]) document.paths[p] = v;
            else console.warn(`Duplicate path skipped: ${p}`);
          }
        }
        if (data?.components?.schemas) {
          document.components.schemas = {
            ...document.components.schemas,
            ...data.components.schemas,
          };
        }
        console.log(`✅ Loaded swagger from ${url}`);
        loaded = true;
        break;
      } catch (err: any) {
        console.warn(`⚠️ Could not load from ${url}: ${err.message ?? err}`);
      }
    }

    if (!loaded) {
      console.warn(
        `❌ Could not load Swagger from base ${base} (all attempts failed)`,
      );
    }
  }

  // save file
  const outputPath = path.join(process.cwd(), 'ibanking-swagger.json');
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
  console.log(`✅ Combined Swagger saved to ${outputPath}`);

  SwaggerModule.setup('api/docs', app, document);
}
