import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

const ENV = process.env.NODE_ENV;

const configOpts: ConfigModuleOptions = {
  envFilePath: !ENV ? '.env' : `.env.${ENV}`,
};

@Module({
  imports: [ConfigModule.forRoot(configOpts), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
