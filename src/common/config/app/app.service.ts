import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get name(): boolean {
    return this.configService.get('app.appName') === 'true';
  }
  get url(): boolean {
    return this.configService.get('app.appUrl') === 'true';
  }
  get port(): boolean {
    return this.configService.get('app.appPort') === 'true';
  }
  get jwtSecret(): string {
    return this.configService.get('app.jwtSecret');
  }
  get jwtExpiresIn(): number {
    return this.configService.get('app.jwtExpiresIn');
  }
}
