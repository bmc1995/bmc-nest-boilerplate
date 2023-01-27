import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule, JwtModuleAsyncOptions, JwtService } from '@nestjs/jwt';
import { GenerateRandToken } from 'src/common/utils/crypto';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from 'config/app/app.service';

const registerAsyncOpts: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: AppConfigService) => ({
    secret: configService.jwtSecret,
    signOptions: { expiresIn: configService.jwtExpiresIn },
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
    ConfigService,
    AppConfigService,
    AuthService,
    LocalStrategy,
    GenerateRandToken,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
