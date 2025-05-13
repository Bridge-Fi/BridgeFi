import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LawyersController } from './lawyers.controller';
import { Lawyer } from './entities/lawyer.entity';
import { LawyerService } from './lawyers.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lawyer]), forwardRef(() => AuthModule)],
  providers: [LawyerService],
  controllers: [LawyersController],
  exports: [LawyerService],
})
export class LawyersModule {}
