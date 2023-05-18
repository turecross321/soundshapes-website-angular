import { BriefUser } from './users';

export interface LoginRequest {
  Email: string;
  PasswordSha512: string;
}

export interface SetEmailRequest {
  NewEmail: string;
}

export interface SetPasswordRequest {
  NewPasswordSha512: string;
}

export interface Session {
  Id: string;
  ExpiresAt: Date;
  User: BriefUser;
  IsBanned: boolean;
  BanReason?: string;
}
