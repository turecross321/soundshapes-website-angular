import { PermissionsType } from './account';

export interface BriefUser {
  Id: string;
  Username: string;
  PermissionsType: PermissionsType;
  PublishedLevelsCount: number;
  FollowersCount: number;
}

export interface FullUser {
  Id: string;
  Username: string;
  CreationDate: Date;
  PermissionsType: number;
  FollowersCount: number;
  FollowingCount: number;
  LikedLevelsCount: number;
  PublishedLevelsCount: number;
  ActivitiesCount: number;
  PlayedLevelsCount: number;
  TotalDeaths: number;
  TotalPlayTime: number;
}

export interface UserRelation {
  Following: boolean;
}
