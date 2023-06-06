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
  CreationDate: Date;
  LastGameLogin: Date;
  LastEventDate: Date;
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

export enum PermissionsType {
  Default = 0,
  Moderator = 1,
  Administrator = 2,
}
