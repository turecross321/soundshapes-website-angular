import { BriefUser } from './users';

export interface BriefLevel {
  Id: string;
  Name: string;
  Author: BriefUser;
  Created: Date;
  Modified: Date;
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
  Plays = 'plays',
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
