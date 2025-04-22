import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  ConflictException,
  Logger,
  UnauthorizedException,
  Res,
  Get,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { Request, Response } from 'express';
import { GetRequest } from 'src/auth/get-requested.decorator';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    this.logger.log('Registration attempt', JSON.stringify(createUserDto));

    try {
      const newUser = await this.usersService.create(createUserDto);
      const { password, ...result } = newUser;
      return result;
    } catch (error) {
      this.logger.error('Registration failed', error.stack);

      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already registered');
      }

      throw new ConflictException('Registration failed');
    }
  }

  @Post('login')
  // @UsePipes(new ValidationPipe({ transform: true }))
  async login(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log(`Login attempt for: ${loginDto.email}`);

    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const { access_token } = this.authService.login(user);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    res.send({ message: 'Login successful', user: user });
  }

  @Get('get-logged-user')
  async getLoggedUser(@GetRequest() req: Request) {
    try {
      const decoded = await this.authService.getLoggedUser(req);
      return decoded;
    } catch {
      return null;
    }
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    return { message: 'Logout successful' };
  }
}
