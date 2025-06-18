export interface User {
  id: number;
  email: string;
  role: "user" | "lawyer" | "admin";
  firstName?: string;
  lastName?: string;
  [key: string]: any;
}

export interface LoggedUser {
  id: number;
  firstName: string;
  email: string;
  lastName: string;
  role: "user" | "lawyer" | "admin";
}
export interface UpdateUser {
  email?: string;
  currentPassword: string;
  newPassword?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
