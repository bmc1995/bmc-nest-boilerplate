import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './common/config/app/config';
import dbConfig from './common/config/database/config';
import { User } from './database/entities/user/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

const ENV = process.env.NODE_ENV;

/**
 * Determine env file, load app & db configs globally
 */
const configOpts: ConfigModuleOptions = {
  envFilePath: !ENV ? '.env' : `.env.${ENV}`,
  isGlobal: true,
  load: [appConfig, dbConfig],
};
/**
 * Since we need to load the NestJs ConfigModule before it's values are available,
 * `useFactory` allows for dynamic creation of providers via factory function.
 *
 * `#forRootAsync` (in module imports) is needed for Dependency Injection
 */
const typeormOpts: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    entities: [User],
    ...(await configService.getOrThrow('database', undefined)),
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot(configOpts),
    TypeOrmModule.forRootAsync(typeormOpts),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
