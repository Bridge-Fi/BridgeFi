import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisaJob } from './entities/visa-job.entity';
import { CreateVisaJobDto } from './dto/create-visa-job.dto';
import { UpdateVisaJobDto } from './dto/update-visa-job.dto';
import { ListJobsDto } from './dto/list-jobs.dto';

@Injectable()
export class VisaJobsService {
  constructor(
    @InjectRepository(VisaJob)
    private repo: Repository<VisaJob>,
  ) {}

  async create(dto: CreateVisaJobDto): Promise<VisaJob> {
    const job = this.repo.create(dto);
    return this.repo.save(job);
  }

  async findAndCount(
    filter: ListJobsDto,
  ): Promise<{ jobs: VisaJob[]; total: number }> {
    const limit = 12;
    const offset = (filter.page - 1) * limit;

    // Map frontend visa codes to DB values (e.g., H1B -> H-1B)
    const visaMap: Record<string, string> = {
      H1B: 'H-1B',
      H2B: 'H-2B',
      J1: 'J-1',
    };
    const dbVisa = visaMap[filter.visa] || filter.visa;

    // Use query builder to filter visaType exactly
    const query = this.repo
      .createQueryBuilder('job')
      .where('job.visaType = :visaType', { visaType: dbVisa })
      .orderBy('job.caseNumber', 'ASC')
      .take(limit)
      .skip(offset);

    const [jobs, total] = await query.getManyAndCount();
    return { jobs, total };
  }

  async findOne(caseNumber: string): Promise<VisaJob> {
    const job = await this.repo.findOneBy({ caseNumber });
    if (!job) throw new NotFoundException(`Job ${caseNumber} not found`);
    return job;
  }

  async update(caseNumber: string, dto: UpdateVisaJobDto): Promise<VisaJob> {
    const job = await this.findOne(caseNumber);
    Object.assign(job, dto);
    return this.repo.save(job);
  }

  async remove(caseNumber: string): Promise<void> {
    const job = await this.findOne(caseNumber);
    await this.repo.remove(job);
  }
}
