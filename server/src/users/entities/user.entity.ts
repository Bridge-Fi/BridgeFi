import { Appointment } from 'src/appointments/entities/appointments.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ unique: true, name: 'email' })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
