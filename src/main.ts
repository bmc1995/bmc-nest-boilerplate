import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({ origin: 'http://localhost:4200' });
  app.use(cookieParser('SecretCode'));

  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
