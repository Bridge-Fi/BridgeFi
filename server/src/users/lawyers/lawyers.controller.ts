import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { CreateLawyerDto } from '../dtos/create-lawyer-dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { LawyerService } from './lawyer.service';

@Controller('lawyers')
export class LawyerController {
  constructor(private readonly lawyerService: LawyerService) {}

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  async create(@Body() createLawyerDto: CreateLawyerDto, @Req() req) {
    return this.lawyerService.create(createLawyerDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return this.lawyerService.findAll();
  }
}
