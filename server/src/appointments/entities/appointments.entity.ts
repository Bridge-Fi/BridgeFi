// server/src/appointments/entities/appointments.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Lawyer } from 'src/lawyers/entities/lawyer.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({
    name: 'appointment_date',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  appointmentDate: Date;

  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';

  @Column({ type: 'text', nullable: false })
  inquiry: string;

  @ManyToOne(() => User, (user) => user.appointments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Lawyer, (lawyer) => lawyer.appointments, {
    onDelete: 'SET NULL',
  })
  lawyer: Lawyer;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
