import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('visa_job')
export class VisaJob {
  @PrimaryColumn()
  caseNumber: string;

  @Column()
  employerName: string;

  @Column()
  jobTitle: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  state?: string;

  @Column()
  visaType: string;

  @Column({ nullable: true })
  employerPhone?: string;

  @Column({ nullable: true })
  employerPocPhone?: string;

  @Column({ nullable: true })
  employerPocEmail?: string;
}
