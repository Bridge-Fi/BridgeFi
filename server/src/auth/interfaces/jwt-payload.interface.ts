export interface JwtPayload {
  sub: number;
  email: string;
  role: 'user' | 'admin' | 'lawyer';
  firstName?: string;
  lastName?: string;
}
