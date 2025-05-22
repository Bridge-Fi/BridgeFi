import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LawyersModule } from './lawyers/lawyers.module';
import { Lawyer } from './lawyers/entities/lawyer.entity';
import { User } from './users/entities/user.entity';
import { Appointment } from './appointments/entities/appointments.entity';
import { AppointmentsModule } from './appointments/appointments.module';
import { VisaJobsModule } from './visa-jobs/visa-jobs.module';
import { VisaJob } from './visa-jobs/entities/visa-job.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'BRIDGEFI',
      entities: [User, Lawyer, Appointment, VisaJob],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    LawyersModule,
    AppointmentsModule,
    VisaJobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
