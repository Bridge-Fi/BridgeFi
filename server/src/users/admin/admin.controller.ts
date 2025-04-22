import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ConflictException,
} from '@nestjs/common';
import { CreateLawyerDto } from '../dtos/create-lawyer-dto';
import { AdminService } from '../admin/admin.service';
import { Lawyer } from '../entities/lawyer.entity';

@Controller('admin/lawyers')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createLawyer(
    @Body() createLawyerDto: CreateLawyerDto,
  ): Promise<Lawyer> {
    try {
      return await this.adminService.createLawyer(createLawyerDto);
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Lawyer already exists');
      }
      throw error;
    }
  }

  @Put(':id')
  async updateLawyer(
    @Param('id') id: number,
    @Body() updateLawyerDto: CreateLawyerDto,
  ): Promise<Lawyer> {
    return await this.adminService.updateLawyer(id, updateLawyerDto);
  }

  @Delete(':id')
  async deleteLawyer(@Param('id') id: number): Promise<{ message: string }> {
    await this.adminService.deleteLawyer(id);
    return { message: 'Lawyer deleted successfully' };
  }
}
