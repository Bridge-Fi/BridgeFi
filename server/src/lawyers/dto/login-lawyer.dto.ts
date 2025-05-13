import { IsEmail, IsString } from 'class-validator';

export class LoginLawyerDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
