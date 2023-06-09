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
  Queues: number;
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
  TotalCompletions = 'totalCompletions',
  UniqueCompletions = 'uniqueCompletions',
  Likes = 'likes',
  Queues = 'queues',
  FileSize = 'fileSize',
  Difficulty = 'difficulty',
  Relevance = 'relevance',
  Random = 'random',
  TotalDeaths = 'totalDeaths',
  TotalPlayTime = 'totalPlayTime',
  AveragePlayTime = 'averagePlayTime',
  TotalScreens = 'totalScreens',
  TotalEntities = 'totalEntities',
  Bpm = 'bpm',
  TransposeValue = 'transposeValue',
}

export interface LevelFilters {
  search?: string | null;
  createdBy?: string | null;
  likedBy?: string | null;
  queuedBy?: string | null;
  likedOrQueuedBy?: string | null;
  completedBy?: string | null;
  inAlbum?: string | null;
  inDaily?: string | null;
  inDailyDate?: string | null;
  inLastDaily?: boolean | null;
  bpm?: number | null;
  transposeValue?: number | null;
  scaleIndex?: number | null;
  hasCar?: boolean | null;
  hasExplodingCar?: boolean | null;
}

export interface FullLevel {
  Id: string;
  Name: string;
  Author: BriefUser;
  CreationDate: Date;
  ModificationDate: Date;
  TotalPlays: number;
  UniquePlays: number;
  TotalCompletions: number;
  UniqueCompletions: number;
  Likes: number;
  Queues: number;
  TotalDeaths: number;
  TotalPlayTime: number;
  Language: number;
  Difficulty: number;
  Analysis: LevelAnalysis;
  Albums: Album[];
  DailyLevels: DailyLevel[];
}

export interface LevelAnalysis {
  FileSize: number;
  Bpm: number;
  TransposeValue: number;
  ScaleIndex: Scale;
  TotalScreens: number;
  TotalEntities: number;
  HasCar: boolean;
  HasExplodingCar: boolean;
}

export enum Scale {
  Major = 0,
  Pentatonic = 1,
  Minor = 2,
  Chromatic = 3,
}

export interface LevelRelation {
  Completed: boolean;
  Liked: boolean;
  Queued: boolean;
}
