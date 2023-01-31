import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { GenerateRandToken } from '../../common/utils/crypto';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AppConfigModule } from 'config';
import { AppConfigService } from 'config/config.getters';

const registerAsyncOpts: JwtModuleAsyncOptions = {
  imports: [AppConfigModule],
  inject: [AppConfigService],
  useFactory: async (configService: AppConfigService) => ({
    secret: configService.jwtSecret,
    signOptions: {
      expiresIn: configService.jwtExpiresIn,
    },
  }),
};

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync(registerAsyncOpts),
  ],
  controllers: [AuthController],
  providers: [
    AppConfigService,
    AuthService,
    LocalStrategy,
    GenerateRandToken,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
