import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from 'src/common/guards/auth/auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return req.user;
  }
}

// session-based auth?:
// (import Res[nest] & Response[express] to add @Res(): Response)
// res.cookie('sesh', sessionToken, {
//   httpOnly: true,
//   maxAge: 60000,
//   signed: true,
// });
