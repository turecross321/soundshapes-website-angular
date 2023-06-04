import { PermissionsType } from './account';

export interface BriefUser {
  Id: string;
  Username: string;
  PermissionsType: PermissionsType;
  PublishedLevels: number;
  Followers: number;
}

export interface FullUser {
  Id: string;
  Username: string;
  CreationDate: Date;
  LastGameLogin: Date;
  PermissionsType: number;
  Followers: number;
  Following: number;
  LikedLevels: number;
  PublishedLevels: number;
  Activities: number;
  PlayedLevels: number;
  TotalDeaths: number;
  TotalPlayTime: number;
}

export interface UserRelation {
  Following: boolean;
  Followed: boolean;
}
