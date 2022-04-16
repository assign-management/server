import { Role } from './generated/graphql';

export interface OauthPayload {
  image?: string;
  email: string;
  provider: string;
  name?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  resetToken: string;
  resetTokenExpires: string;
  image?: string;
  provider?: string;
  createdAt: Date;
  updatedAt: Date;
}
