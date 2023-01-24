import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from 'src/common/guards/auth/auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    console.log(req.headers);
    const body = await this.authService.login(req.user);

    res.cookie('sesh', body.access_token, {
      httpOnly: true,
      maxAge: 60000,
      signed: true,
    });
    res.json(body);
  }
}
