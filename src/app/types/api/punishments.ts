import { el } from 'date-fns/locale';
import { BriefUser } from './users';

export interface Punishment {
  Id: string;
  Recipient: BriefUser;
  PunishmentType: PunishmentType;
  Reason: string;
  Revoked: boolean;
  Author: BriefUser;
  IssuedAt: Date;
  ExpiresAt: Date;
}

export enum PunishmentType {
  Ban = 0,
}

export function DoPunishmentsIncludeBan(punishments: Punishment[]) {
  let containsBan = false;
  punishments.forEach((element) => {
    if (element.PunishmentType == PunishmentType.Ban) containsBan = true;
  });

  return containsBan;
}
