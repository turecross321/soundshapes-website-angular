export interface BriefUser {
  Id: string;
  Username: string;
  PermissionsType: number;
  PublishedLevelsCount: number;
  FollowersCount: number;
}

export interface FullUser {
  Id: string;
  Username: string;
  PermissionsType: number;
  FollowersCount: number;
  FollowingCount: number;
  LikedLevelsCount: number;
  PublishedLevelsCount: number;
  ActivitiesCount: number;
  Deaths: number;
  TotalPlayTime: number;
}

export interface IsFollowingResponse {
  IsFollowing: boolean;
}
