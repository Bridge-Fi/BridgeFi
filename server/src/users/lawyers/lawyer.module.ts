import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LawyerService } from './lawyer.service';
import { Lawyer } from '../entities/lawyer.entity';
import { LawyerController } from './lawyers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lawyer])],
  providers: [LawyerService],
  controllers: [LawyerController],
  exports: [LawyerService],
})
export class LawyerModule {}
