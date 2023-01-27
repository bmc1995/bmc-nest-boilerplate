import { Module, OnModuleInit } from '@nestjs/common';
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './database/entities/user/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import config from 'config';
const ENV = process.env.NODE_ENV;

/**
 * Determine env file, load app & db configs globally
 */
const configOpts: ConfigModuleOptions = {
  envFilePath: !ENV ? '.env' : `.env.${ENV}`,
  load: [...config],
  isGlobal: true,
};
/**
 * The NestJs ConfigModule needs to load before TypeOrm's values are available,
 * `useFactory` allows for dynamic creation of providers via factory function.
 * @link [Configuration](https://docs.nestjs.com/techniques/configuration)
 * @link [Async Configuration](https://docs.nestjs.com/techniques/database#async-configuration-1)
 * @link [useFactory](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory)
 */
const typeormOpts: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    entities: [User],
    ...configService.getOrThrow('database'),
  }),
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
