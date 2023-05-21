import { BriefLevel } from './levels';

export interface DailyLevel {
  Id: string;
  Level: BriefLevel;
  CreationDate: Date;
  ModificationDate: Date;
  TotalPlays: number;
  UniquePlays: number;
  Likes: number;
  Difficulty: number;
}
