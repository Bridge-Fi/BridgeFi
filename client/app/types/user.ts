export interface User {
  id: number;
  email: string;
  role: "user" | "lawyer" | "admin";
}

export interface UpdateUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}
