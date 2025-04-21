import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3333,
  username: 'root',
  password: 'Kali123',
  database: 'BRIDGEFI',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // Disable in production
};
