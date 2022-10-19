import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Sentry.init({
    dsn: 'https://4eabac6c0f3846449d4f01f4d3f47dbf@o4504007509278720.ingest.sentry.io/4504007511965697',
  });
  app.enableCors();
  await app.listen(8080);
}
bootstrap();
