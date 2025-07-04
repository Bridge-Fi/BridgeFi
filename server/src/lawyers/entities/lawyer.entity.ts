import { Appointment } from 'src/appointments/entities/appointments.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcryptjs'; // 🔁 Make sure you're using the same library across the app

@Entity({ name: 'lawyer' })
export class Lawyer {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false }) // 🛡️ Ensure password is required
  password: string;

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

  @Column({ type: 'varchar', length: 255, nullable: false })
  location: string;

  @OneToMany(() => Appointment, (appointment) => appointment.lawyer)
  appointments: Appointment[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
