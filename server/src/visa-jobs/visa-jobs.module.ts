import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisaJobsService } from './visa-jobs.service';
import { VisaJobsController } from './visa-jobs.controller';
import { VisaJob } from './entities/visa-job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisaJob])],
  providers: [VisaJobsService],
  controllers: [VisaJobsController],
})
export class VisaJobsModule {}
