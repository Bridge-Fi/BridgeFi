import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { CreateLawyerDto } from './dto/create-lawyer.dto';
import { UpdateLawyerDto } from './dto/update-lawyer.dto';
import { LawyerService } from './lawyers.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import * as bcrypt from 'bcryptjs';
import { LoginLawyerDto } from './dto/login-lawyer.dto';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';

@Controller('lawyers')
export class LawyersController {
  constructor(
    private readonly lawyersService: LawyerService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  findAll() {
    return this.lawyersService.findAll();
  }

  @Post('login')
  async login(
    @Body() dto: LoginLawyerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const lawyer = await this.lawyersService.validateLawyer(
      dto.email,
      dto.password,
    );
    const { access_token } = this.authService.login(lawyer);
    // set the token string, not the entire object
    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'lax', // helps with CSRF in dev & prod
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60, // 1 hour
    });
    return { message: 'Login successful', role: 'lawyer' };
  }

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  async create(@Body() createLawyerDto: CreateLawyerDto) {
    const hashed = await bcrypt.hash(createLawyerDto.password, 10);
    return this.lawyersService.create({
      ...createLawyerDto,
      password: hashed,
    });
  }

  @Patch(':id')
  @UseGuards(AuthGuard, AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateLawyerDto: UpdateLawyerDto,
  ) {
    return this.lawyersService.update(+id, updateLawyerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  async remove(@Param('id') id: string) {
    return this.lawyersService.remove(+id);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Req() req: Request & { user?: any }) {
    // AuthGuard should have populated req.user
    if (!req.user) {
      throw new UnauthorizedException('Not logged in as lawyer');
    }
    return req.user;
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return { message: 'Logged out' };
  }
}
