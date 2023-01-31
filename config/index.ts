import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import appConfig from './appConfig';
import { AppConfigService, DbConfigService } from './config.getters';
import DbConfig from './DbConfig';

// export default [DbConfig, appConfig];
const ENV = process.env.NODE_ENV;
/**
 * Determine env file, load app & db configs globally
 */
const configOpts: ConfigModuleOptions = {
  envFilePath: !ENV ? '.env' : `.env.${ENV}`,
  isGlobal: true,
  // load: [...config],
};

@Module({
  imports: [ConfigModule.forRoot({ load: [appConfig], ...configOpts })],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}

@Module({
  imports: [ConfigModule.forRoot({ load: [DbConfig], ...configOpts })],
  providers: [DbConfigService],
  exports: [DbConfigService],
})
export class DbConfigModule {}
