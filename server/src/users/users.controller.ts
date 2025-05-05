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
  UseGuards,
  Patch,
  Delete,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { Request, Response } from 'express';
import { GetRequest } from 'src/auth/get-requested.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { UpdateUserDto } from './dtos/update-user.dto';

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
    const { ...safeUser } = user;

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 3600000, // 1 hour in milliseconds
      path: '/',
    });

    res.send({ message: 'Login successful', user: safeUser, role: user.role });
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
  @UseGuards(AuthGuard)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    });
    return { message: 'Logout successful' };
  }

  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getCurrentUser(@Res() res: Response) {
    try {
      const user = res.locals.user;
      return res.status(200).json({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetRequest() req: Request,
  ) {
    try {
      const userId = parseInt(id);
      if (isNaN(userId)) {
        throw new Error('Invalid user ID');
      }

      const loggedUser = await this.authService.getLoggedUser(req);

      if (userId !== loggedUser.sub) {
        throw new UnauthorizedException('You can only update your own profile');
      }
      const updatedUser = await this.usersService.updateUser(
        userId,
        updateUserDto,
      );

      const { password, ...userResult } = updatedUser;

      return userResult;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
