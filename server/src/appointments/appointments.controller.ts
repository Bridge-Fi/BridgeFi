// server/src/appointments/appointments.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';

@Controller('appointments')
@UseGuards(AuthGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createAppointment(
    @Body() dto: CreateAppointmentDto,
    @Req() req: Request & { user: { sub: number } },
  ) {
    // `AuthGuard` ensures `req.user.sub` exists
    const userId = req.user.sub;
    const appointmentDate = new Date(dto.appointmentDate);

    // Service expects an object of shape { userId, lawyerId, appointmentDate, inquiry }
    return this.appointmentsService.createAppointment({
      userId,
      lawyerId: dto.lawyerId,
      // our DTO validated this is a string ISO-date, so service can do new Date(...) itself
      appointmentDate,
      inquiry: dto.inquiry,
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
