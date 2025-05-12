import { Lawyer } from 'src/lawyers/entities/lawyer.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @ManyToOne(() => Lawyer, (lawyer) => lawyer.appointments)
  lawyer: Lawyer;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
