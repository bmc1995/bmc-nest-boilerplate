import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/repositories/user/user.entity';
// import { GenerateRandToken } from 'src/common/utils/crypto';

@Injectable()
export class AuthService {
  // private randTokenGen: GenerateRandToken,
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, // private configService: AppConfigService,
  ) {}

  async validateUser(email: string, hash: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    // console.log(user);

    if (user && user.hashedPassword === hash) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hashedPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const { email, id } = user;
    const payload = { email, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
      message: 'Authentication Success!',
    };
  }
}
