import { IEnvironment } from './environment-interface';

export const environment: IEnvironment = {
  apiBaseUrl:
    window.location.protocol + '//' + window.location.host + '/api/v1/',
};
