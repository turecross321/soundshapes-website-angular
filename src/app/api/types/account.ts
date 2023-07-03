import { Punishment } from './punishments';
import { BriefUser } from './users';

export interface LoginRequest {
  Email: string;
  PasswordSha512: string;
}

export interface SetEmailRequest {
  NewEmail: string;
}

export interface SendPasswordSessionRequest {
  Email: string;
}

export interface SetPasswordRequest {
  NewPasswordSha512: string;
}

export interface Session {
  Id: string;
  CreationDate: number;
  ExpiryDate: number;
  User: BriefUser;
  ActivePunishments: Punishment[];
}
