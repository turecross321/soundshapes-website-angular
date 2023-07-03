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
  PermissionsType: PermissionsType;
  CreationDate: number;
  LastGameLogin: number;
  LastEventDate: number;
  Followers: number;
  Following: number;
  LikedLevels: number;
  QueuedLevels: number;
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

export enum PermissionsType {
  Default = 0,
  Moderator = 1,
  Administrator = 2,
}
