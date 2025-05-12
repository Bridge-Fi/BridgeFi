// src/entities/message.entity.ts
import { Appointment } from 'src/appointments/entities/appointments.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Appointment)
  appointment: Appointment;

  @Column({ type: 'enum', enum: ['user', 'lawyer'] })
  sender: string;

  @Column('text')
  message: string;

  @Column({
    name: 'sent_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  sentAt: Date;
}
