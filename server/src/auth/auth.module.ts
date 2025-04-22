// src/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';

const jwtConfig = {
  secret: 'your_strong_secret_key',
  expiresIn: '60m',
};

@Module({
  imports: [
    forwardRef(() => UsersModule), // ✅ Use forwardRef to solve circular import
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
  ],
  providers: [
    AuthService,
    // LocalStrategy,
    // {
    //   provide: 'JWT_CONFIG',
    //   useValue: jwtConfig,
    // },
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
