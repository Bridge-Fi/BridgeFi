// import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginUserDto } from '../users/dtos/login-user.dto';
// import { CreateUserDto } from '../users/dtos/create-user.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('login')
//   async login(
//     @Body() loginUserDto: LoginUserDto,
//   ): Promise<{ access_token: string }> {
//     try {
//       const user = await this.authService.validateUser(
//         loginUserDto.email,
//         loginUserDto.password,
//       );
//       if (!user) {
//         throw new UnauthorizedException('Invalid credentials');
//       }

//       return this.authService.login(user);
//     } catch {
//       throw new UnauthorizedException('Authentication failed');
//     }
//   }

//   @Post('register')
//   async register(
//     @Body() createUserDto: CreateUserDto,
//   ): Promise<{ access_token: string }> {
//     try {
//       const newUser = await this.authService.register(createUserDto);
//       return this.authService.login(newUser);
//     } catch {
//       throw new UnauthorizedException('Registration failed');
//     }
//   }
// }
