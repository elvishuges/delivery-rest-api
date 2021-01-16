declare const module: any;

import { join } from 'path';
import compression from 'fastify-compress';
import helmet from 'fastify-helmet';
import rateLimit from 'fastify-rate-limit';

import { contentParser } from 'fastify-multer';
import { useContainer } from 'class-validator';

import { NestFactory } from '@nestjs/core';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const adapter = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  const config = new DocumentBuilder()
    .setTitle('Delivery Api')
    .setDescription('Documentação da api...')
    .setVersion('1.0')
    .addTag('Delivery RESTApi')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const port = parseInt(process.env.PORT, 10) || 3000;
  const host = process.env.HOST || '0.0.0.0';

  // Serve static files
  app.useStaticAssets({
    root: join(process.cwd(), 'public'),
  });

  // Enable cors
  app.enableCors();

  // Register middlewares
  app.register(contentParser);
  app.register(compression, { encodings: ['gzip', 'deflate'] });

  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  // Accepts 250 request per minute per ip
  app.register(rateLimit, {
    max: 250,
    timeWindow: 60 * 1000,
  });

  // Enable shutdowns hooks
  app.enableShutdownHooks();

  // Link DI container to class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Build docs
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, host);
  console.log(`Application is running on: ${await app.getUrl()}`);

  // Enable module hot reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
