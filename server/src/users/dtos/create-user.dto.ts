export class CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: string;
  id: number;
}
