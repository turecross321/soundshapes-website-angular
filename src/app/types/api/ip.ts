export interface IpAddress {
  IpAddress: string;
  Authorized: boolean;
  OneTimeUse: boolean;
}

export interface IpWrapper {
  IpAddresses: IpAddress[];
  Count: number;
}

export interface AuthorizeIpRequest {
  IpAddress: string;
  OneTimeUse: boolean;
}
