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
  ExpiresAt: Date;
  User: BriefUser;
  ActivePunishments: Punishment[];
}

export enum PermissionsType {
  Defualt = 0,
  Moderator = 1,
  Administrator = 2,
}
