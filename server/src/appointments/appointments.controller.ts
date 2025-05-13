import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('appointments')
@UseGuards(AuthGuard) // require authentication for all appointment routes
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment({
      userId: dto.userId,
      lawyerId: dto.lawyerId,
      date: dto.date,
    });
  }

  @Get('user/:userId')
  async findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.appointmentsService.getUserAppointments(userId);
  }

  @Get('lawyer/:lawyerId')
  async findByLawyer(@Param('lawyerId', ParseIntPipe) lawyerId: number) {
    return this.appointmentsService.getLawyerAppointments(lawyerId);
  }
}
