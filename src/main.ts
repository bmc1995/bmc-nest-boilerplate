import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({ origin: configService.get('CLIENT_ORIGIN') });
  app.use(cookieParser(configService.get('COOKIE_SECRET')));

  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
