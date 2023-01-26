import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  appName: process.env.APP_NAME,
  appPort: parseInt(process.env.APP_PORT) || 3000,
  appUrl: process.env.APP_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
}));
