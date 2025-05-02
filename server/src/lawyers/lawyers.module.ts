import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LawyersController } from './lawyers.controller';
import { Lawyer } from './entities/lawyer.entity';
import { LawyerService } from './lawyers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lawyer])],
  providers: [LawyerService],
  controllers: [LawyersController],
  exports: [LawyerService],
})
export class LawyersModule {}
