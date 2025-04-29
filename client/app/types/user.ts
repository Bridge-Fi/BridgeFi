export interface User {
  id: number;
  email: string;
  role: "user" | "lawyer" | "admin";
}
