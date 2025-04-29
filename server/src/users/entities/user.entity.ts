import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Lawyer } from './lawyer.entity';

@Entity()
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

  @OneToMany(() => Lawyer, (lawyer) => lawyer.createdBy)
  createdLawyers: Lawyer[];
}
