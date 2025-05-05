export class UpdateUserDto {
  fullName?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  currentPassword: string;
  newPassword?: string | null;
}
