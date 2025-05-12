import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointments.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
  ) {}

  async createAppointment(data: {
    userId: number;
    lawyerId: number;
    date: Date;
  }) {
    const appointment = this.appointmentRepo.create({
      user: { id: data.userId },
      lawyer: { id: data.lawyerId },
      date: data.date,
    });
    return this.appointmentRepo.save(appointment);
  }

  async getUserAppointments(userId: number) {
    return this.appointmentRepo.find({
      where: { user: { id: userId } },
      relations: ['lawyer'],
    });
  }

  async getLawyerAppointments(lawyerId: number) {
    return this.appointmentRepo.find({
      where: { lawyer: { id: lawyerId } },
      relations: ['user'],
    });
  }
}
