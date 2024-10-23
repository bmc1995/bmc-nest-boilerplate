import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DbConfigModule } from 'config';
import { DbConfigService } from 'config/config.getters';
import { DataSource } from 'typeorm';

export const exampleMySQLDataSource = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];

/**
 * The NestJs ConfigModule needs to load before TypeOrm's values are available,
 * `useFactory` allows for dynamic creation of providers via factory function.
 * @link [Configuration](https://docs.nestjs.com/techniques/configuration)
 * @link [Async Configuration](https://docs.nestjs.com/techniques/database#async-configuration-1)
 * @link [useFactory](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory)
 */
export const typeormOpts: TypeOrmModuleAsyncOptions = {
  imports: [DbConfigModule],
  inject: [DbConfigService],
  useFactory: async (config: DbConfigService) => ({
    // entities: [User],
    migrations: ['./database/migrations/*'],
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
