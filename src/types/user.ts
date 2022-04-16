import { Role } from './generated/graphql';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  resetToken: string;
  resetTokenExpires: string;
  createdAt: Date;
  updatedAt: Date;
}
