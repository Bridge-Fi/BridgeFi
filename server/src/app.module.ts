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
      entities: [User, Lawyer, Appointment],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    LawyersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
