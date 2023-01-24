import { getConfigToken } from '@nestjs/config';

export const jwtConstants = {
  secret: getConfigToken('JWT_SECRET'),
};
