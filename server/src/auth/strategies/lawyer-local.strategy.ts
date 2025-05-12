// src/auth/lawyer-local.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LawyerService } from 'src/lawyers/lawyers.service';

@Injectable()
export class LawyerLocalStrategy extends PassportStrategy(
  Strategy,
  'lawyer-local',
) {
  constructor(private lawyersService: LawyerService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    return this.lawyersService.validateLawyer(email, password);
  }
}
