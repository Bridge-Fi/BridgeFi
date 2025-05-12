// src/auth/strategies/lawyer-jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LawyerService } from 'src/lawyers/lawyers.service';

@Injectable()
export class LawyerJwtStrategy extends PassportStrategy(
  Strategy,
  'lawyer-jwt',
) {
  constructor(private lawyersService: LawyerService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return this.lawyersService.findOne(payload.sub);
  }
}
