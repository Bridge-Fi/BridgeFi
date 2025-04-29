import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { LawyerModule } from './users/lawyers/lawyer.module';
import { Lawyer } from './users/entities/lawyer.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'BRIDGEFI',
      entities: [User, Lawyer],
      synchronize: true, // Disable in production
    }),
    AuthModule,
    LawyerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
