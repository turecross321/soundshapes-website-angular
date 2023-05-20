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
  Deaths = 'deaths',
  TotalPlayTime = 'totalPlayTime',
  AveragePlayTime = 'averagePlayTime',
}
