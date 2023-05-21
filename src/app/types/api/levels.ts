import { Album } from './albums';
import { DailyLevel } from './daily-levels';
import { BriefUser } from './users';

export interface BriefLevel {
  Id: string;
  Name: string;
  Author: BriefUser;
  CreationDate: Date;
  ModificationDate: Date;
  TotalPlays: number;
  UniquePlays: number;
  Likes: number;
  Difficulty: number;
}

export interface LevelsWrapper {
  Levels: BriefLevel[];
  Count: number;
}

export enum LevelOrder {
  CreationDate = 'creationDate',
  ModificationDate = 'modificationDate',
  TotalPlays = 'plays',
  UniquePlays = 'uniquePlays',
  Likes = 'likes',
  FileSize = 'fileSize',
  Difficulty = 'difficulty',
  Relevance = 'relevance',
  Random = 'random',
  TotalDeaths = 'totalDeaths',
  TotalPlayTime = 'totalPlayTime',
  AveragePlayTime = 'averagePlayTime',
  TotalScreens = 'totalScreens',
  TotalEntities = 'totalEntities',
}

export interface FullLevel {
  Id: string;
  Name: string;
  Author: BriefUser;
  CreationDate: Date;
  ModificationDate: Date;
  TotalPlays: number;
  UniquePlays: number;
  Likes: number;
  TotalDeaths: number;
  TotalPlayTime: number;
  Language: number;
  Difficulty: number;
  FileSize: number;
  Bpm: number;
  TransposeValue: number;
  ScaleIndex: Scale;
  TotalScreens: number;
  TotalEntities: number;
  Albums: Album[];
  DailyLevels: DailyLevel[];
}

export enum Scale {
  Major = 0,
  Pentatonic = 1,
  Minor = 2,
  Chromatic = 3,
}
