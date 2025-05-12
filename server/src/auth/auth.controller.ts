// src/auth/auth.controller.ts
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LawyerLocalStrategy } from './strategies/lawyer-local.strategy';

@Controller('auth/lawyer')
export class AuthController {
  @UseGuards(LawyerLocalStrategy)
  @Post('login')
  async login(@Request() req) {
    return {
      accessToken: req.user.accessToken,
      role: 'lawyer',
    };
  }
}
