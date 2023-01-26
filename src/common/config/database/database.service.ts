import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get dbType(): boolean {
    return this.configService.get('AUTH_ENABLED') === 'true';
  }
  get host(): boolean {
    return this.configService.get('AUTH_ENABLED') === 'true';
  }
  get port(): boolean {
    return this.configService.get('AUTH_ENABLED') === 'true';
  }
  get username(): boolean {
    return this.configService.get('AUTH_ENABLED') === 'true';
  }
  get password(): boolean {
    return this.configService.get('AUTH_ENABLED') === 'true';
  }
  get url(): boolean {
    return this.configService.get('AUTH_ENABLED') === 'true';
  }
}
