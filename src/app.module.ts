import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './modules/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DbConfigModule } from 'config';
import { DbConfigService } from 'config/config.getters';
import { DocumentModule } from './modules/document/document.module';
import { DataSource } from 'typeorm';

/**
 * The NestJs ConfigModule needs to load before TypeOrm's values are available,
 * `useFactory` allows for dynamic creation of providers via factory function.
 * @link [Configuration](https://docs.nestjs.com/techniques/configuration)
 * @link [Async Configuration](https://docs.nestjs.com/techniques/database#async-configuration-1)
 * @link [useFactory](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory)
 */
const typeormOpts: TypeOrmModuleAsyncOptions = {
  imports: [DbConfigModule],
  inject: [DbConfigService],
  useFactory: async (config: DbConfigService) => ({
    // entities: [User],
    migrations: ['./database/migrations/*'],
    entities: [__dirname + 'modules/**/*.entity.js'],
    synchronize: true,
    cli: {
      migrationsDir: './database/migrations',
    },
    dataSourceFactory: async (options) => {
      const dataSource = await new DataSource(options).initialize();
      return dataSource;
    },
    ...config.dbConfigAll,
  }),
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeormOpts),
    AuthModule,
    UsersModule,
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
