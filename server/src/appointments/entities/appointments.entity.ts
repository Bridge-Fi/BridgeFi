import { Lawyer } from 'src/lawyers/entities/lawyer.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'text' })
  time: string;

  @Column({ type: 'text' })
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';

  @ManyToOne(() => User, (user) => user.appointments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Lawyer, (lawyer) => lawyer.appointments, {
    onDelete: 'SET NULL',
  })
  lawyer: Lawyer;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
