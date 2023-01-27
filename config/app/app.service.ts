import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get name(): string {
    return this.configService.get('app.appName');
  }
  get url(): string {
    return this.configService.get('app.appUrl');
  }
  get port(): string {
    return this.configService.get('app.appPort');
  }
  get jwtSecret(): string {
    return this.configService.get('app.jwtSecret');
  }
  get jwtExpiresIn(): number {
    return this.configService.get('app.jwtExpiresIn');
  }
}
