import { Appointment } from 'src/appointments/entities/appointments.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity({ name: 'lawyer' })
export class Lawyer {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column('text')
  legalExperience: string;

  @Column('text')
  education: string;

  @Column({ unique: true })
  barNumber: string;

  @Column('simple-array')
  visaSpecialties: string[];

  @Column({ nullable: true })
  yearsOfExperience: number;

  @Column({ nullable: true })
  lawFirm: string;

  @Column({ default: false })
  verified: boolean;

  @ManyToMany(() => Appointment, (appointment) => appointment.lawyer)
  appointments: Appointment[];
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
