import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseType } from 'typeorm';

// Why doesn't this work in AppModule?

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get type(): DatabaseType {
    return this.configService.get('database.type');
  }
  get host(): string {
    return this.configService.get('database.host');
  }
  get port(): number {
    return this.configService.get('database.port');
  }
  get username(): string {
    return this.configService.get('database.username');
  }
  get password(): string {
    return this.configService.get('database.password');
  }
  get autoLoadEntities(): boolean {
    return this.configService.get('database.autoLoadEntities');
  }
}
