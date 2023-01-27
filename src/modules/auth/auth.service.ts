import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login.dto';
import { User } from '../../database/entities/user/user.entity';
import { AppConfigService } from 'config/app/app.service';
// import { GenerateRandToken } from 'src/common/utils/crypto';

@Injectable()
export class AuthService {
  // private randTokenGen: GenerateRandToken,
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, // private configService: AppConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    // console.log(user);

    if (user && user.pass === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pass, ...result } = user;
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
