import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateLawyerDto } from './dto/create-lawyer.dto';
import { UpdateLawyerDto } from './dto/update-lawyer.dto';
import { LawyerService } from './lawyers.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('lawyers')
export class LawyersController {
  constructor(private readonly lawyersService: LawyerService) {}

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  create(@Body() createLawyerDto: CreateLawyerDto) {
    return this.lawyersService.create(createLawyerDto);
  }

  @Get()
  findAll() {
    return this.lawyersService.findAll();
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
}
