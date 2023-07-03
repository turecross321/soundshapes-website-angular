import { BriefLevel } from './levels';

export interface DailyLevel {
  Id: string;
  Level: BriefLevel;
  CreationDate: number;
  ModificationDate: number;
  Date: number;
  TotalPlays: number;
  UniquePlays: number;
  Likes: number;
  Difficulty: number;
}
