export interface IpAddress {
  IpAddress: string;
  Authorized: boolean;
  OneTimeUse: boolean;
}

export interface IpWrapper {
  IpAddresses: IpAddress[];
  Count: number;
}
