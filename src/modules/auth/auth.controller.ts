import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../common/guards/auth/auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    const { user } = req;
    return this.authService.login(user);
  }
}

// session-based auth?:
// (import Res[nest] & Response[express] to add @Res(): Response)
// res.cookie('sesh', sessionToken, {
//   httpOnly: true,
//   maxAge: 60000,
//   signed: true,
// });
