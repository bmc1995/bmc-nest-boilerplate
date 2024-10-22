import { Injectable } from '@nestjs/common';
import { ConfigObject, ConfigService } from '@nestjs/config';
import { DatabaseType } from 'typeorm';

@Injectable()
export class AppConfigService {
  constructor(protected configService: ConfigService) {}

  get appName() {
    return this.configService.get<string>('app.appName');
  }

  get appPort() {
    return this.configService.get<number>('app.appPort');
  }

  get appUrl() {
    return this.configService.get<string>('app.appUrl');
  }

  get jwtSecret() {
    return this.configService.getOrThrow<string>('app.jwtSecret', undefined);
  }

  get jwtExpiresIn() {
    return this.configService.getOrThrow<string>('app.jwtExpiresIn', undefined);
  }
}

@Injectable()
export class DbConfigService {
  constructor(protected configService: ConfigService) {}

  get dbConfigAll() {
    return this.configService.getOrThrow<ConfigObject>('database', undefined);
  }

  get type() {
    return this.configService.get<DatabaseType>('database.type');
  }

  get host() {
    return this.configService.get<string>('database.host');
  }

  get port() {
    return this.configService.get<number>('database.port');
  }

  get username() {
    return this.configService.get<string>('database.username');
  }

  get password() {
    return this.configService.get<string>('database.password');
  }

  get autoloadEntities() {
    return this.configService.get<boolean>('database.autoloadEntities');
  }
  get url() {
    return this.configService.get<string>('database.url');
  }
}
