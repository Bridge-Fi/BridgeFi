import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointments.entity';

interface CreateInput {
  userId: number;
  lawyerId: number;
  appointmentDate: Date;
  inquiry: string;
}

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly repo: Repository<Appointment>,
  ) {}

  async createAppointment(dto: CreateInput): Promise<Appointment> {
    const appt = this.repo.create({
      user: { id: dto.userId } as any,
      lawyer: { id: dto.lawyerId },
      appointmentDate: dto.appointmentDate,
      inquiry: dto.inquiry,
    });
    (appt as any).inquiry = dto.inquiry;
    return this.repo.save(appt);
  }

  async getUserAppointments(userId: number): Promise<Appointment[]> {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['lawyer'],
      order: { appointmentDate: 'DESC' },
    });
  }

  async getLawyerAppointments(lawyerId: number): Promise<Appointment[]> {
    return this.repo.find({
      where: { lawyer: { id: lawyerId } },
      relations: ['user'],
      order: { appointmentDate: 'DESC' },
    });
  }
}
