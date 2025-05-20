import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
  ForbiddenException,
  Patch,
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
    const userId = req.user.sub;
    const appointmentDate = new Date(dto.appointmentDate);

    return this.appointmentsService.createAppointment({
      userId,
      lawyerId: dto.lawyerId,
      appointmentDate,
      inquiry: dto.inquiry,
    });
  }

  @UseGuards(AuthGuard)
  @Get('user/:userId')
  async findByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req: Request & { user: { sub: number; role: string } },
  ) {
    if (req.user.sub !== userId) {
      throw new ForbiddenException();
    }
    return this.appointmentsService.getUserAppointments(userId);
  }

  @Get('lawyer/:lawyerId')
  async findByLawyer(@Param('lawyerId', ParseIntPipe) lawyerId: number) {
    return this.appointmentsService.getLawyerAppointments(lawyerId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateStatus(
    @Param('id', ParseIntPipe) appointmentId: number,
    @Body('status') status: 'pending' | 'confirmed' | 'completed' | 'cancelled',
    @Req() req: Request & { user: { sub: number; role: string } },
  ) {
    if (req.user.role !== 'lawyer') {
      throw new ForbiddenException(
        'Only lawyers may update appointment status',
      );
    }
    return this.appointmentsService.updateAppointmentStatus(
      appointmentId,
      status,
      req.user.sub,
    );
  }
}
