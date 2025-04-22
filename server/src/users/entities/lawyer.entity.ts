import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lawyer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // In production, ensure to hash the password

  // Add more fields as needed, e.g.:
  // @Column({ nullable: true })
  // licenseNumber?: string;
}
