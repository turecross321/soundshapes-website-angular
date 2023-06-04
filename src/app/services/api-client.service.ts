import { Injectable } from '@angular/core';
import { SendPasswordSessionRequest, Session } from '../types/api/account';
import {
  LoginRequest,
  SetEmailRequest,
  SetPasswordRequest,
} from '../types/api/account';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import axios, { AxiosRequestConfig } from 'axios';
import { FullUser, UserRelation } from '../types/api/users';
import { FullLevel, LevelOrder, LevelRelation } from '../types/api/levels';
import { LevelsWrapper } from '../types/api/levels';
import { AuthorizeIpRequest, IpWrapper } from '../types/api/ip';
import { environment } from 'src/environments/environment';
import { DoPunishmentsIncludeBan } from '../types/api/punishments';

@Injectable({ providedIn: 'root' })
export class ApiClientService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private _session$ = new BehaviorSubject<Session | undefined>(undefined);
  session$ = this._session$.asObservable();

  constructor() {
    // Check if there is a saved session
    const sessionString = localStorage.getItem('session');
    if (sessionString != null) {
      const session = JSON.parse(sessionString) as Session;

      // Check if saved session has expired
      const expiryDate = new Date(session.ExpiresAt);

      const currentDate = new Date();
      const currentUTCDate = new Date(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
        currentDate.getUTCHours(),
        currentDate.getUTCMinutes()
      );

      // Use saved session if it's not expired
      if (expiryDate > currentUTCDate) {
        this.finishLogIn(session);
      }
      // Log In with saved credentials if session has expired
      else {
        const email = localStorage.getItem('email');
        const passwordSha512 = localStorage.getItem('passwordSha512');

        if (!!email && !!passwordSha512) {
          this.logIn(email, passwordSha512);
        }
      }
    }
  }

  async logIn(email: string, hash: string, saveLogin: boolean = true) {
    const body: LoginRequest = {
      Email: email,
      PasswordSha512: hash,
    };

    try {
      const response = await axios.post<Session>(
        environment.apiBaseUrl + 'account/login',
        body
      );

      if (DoPunishmentsIncludeBan(response.data.ActivePunishments))
        return response;

      if (saveLogin) {
        this.finishLogIn(response.data);
        localStorage.setItem('email', email);
        localStorage.setItem('passwordSha512', hash);
      }

      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  finishLogIn(session: Session) {
    this._isLoggedIn$.next(true);
    this._session$.next(session);

    localStorage.setItem('session', JSON.stringify(session));
    axios.defaults.headers.common['Authorization'] = session.Id;
  }

  logOut() {
    try {
      axios.post(environment.apiBaseUrl + 'account/logout');
    } catch (error) {}

    localStorage.removeItem('session');
    localStorage.removeItem('email');
    localStorage.removeItem('passwordSha512');

    this._session$.next(undefined);
    this._isLoggedIn$.next(false);
  }

  async setEmail(emailCode: string, address: string) {
    const body: SetEmailRequest = {
      NewEmail: address,
    };

    try {
      return await axios.post(
        environment.apiBaseUrl + 'account/setEmail',
        body,
        {
          headers: {
            Authorization: emailCode,
          },
        }
      );
    } catch (error: any) {
      return error.response;
    }
  }

  async sendPasswordSession(email: string) {
    const body: SendPasswordSessionRequest = {
      Email: email,
    };

    return await axios.post(
      environment.apiBaseUrl + 'account/sendPasswordSession',
      body
    );
  }
  async sendAccountRemovalSession(sessionId: string) {
    return await axios.post(
      environment.apiBaseUrl + 'account/sendRemovalSession',
      null,
      {
        headers: {
          Authorization: sessionId,
        },
      }
    );
  }

  async removeAccount(removalCode: string) {
    try {
      return await axios.post(environment.apiBaseUrl + 'account/remove', null, {
        headers: {
          Authorization: removalCode,
        },
      });
    } catch (error: any) {
      return error.response;
    }
  }

  async setPassword(passwordCode: string, hash: string) {
    const body: SetPasswordRequest = {
      NewPasswordSha512: hash,
    };

    try {
      return await axios.post(
        environment.apiBaseUrl + 'account/setPassword',
        body,
        {
          headers: {
            Authorization: passwordCode.toUpperCase(),
          },
        }
      );
    } catch (error: any) {
      return error.response;
    }
  }

  async getUserWithUsername(username: string) {
    try {
      return await axios.get<FullUser>(
        environment.apiBaseUrl + 'users/username/' + username
      );
    } catch (error: any) {
      return error.response;
    }
  }

  async getUserRelation(userId: string) {
    try {
      let session = await firstValueFrom(this.session$);

      return await axios.get<UserRelation>(
        environment.apiBaseUrl +
          'users/id/' +
          userId +
          '/users/id/' +
          session?.User.Id
      );
    } catch (error: any) {
      return error.response;
    }
  }

  async followUser(id: string) {
    return await axios.post(
      environment.apiBaseUrl + 'users/id/' + id + '/follow'
    );
  }

  async unFollowUser(id: string) {
    return await axios.post(
      environment.apiBaseUrl + 'users/id/' + id + '/unFollow'
    );
  }

  async getLevels(
    from: number,
    count: number,
    order: LevelOrder,
    descending: boolean,
    searchQuery?: string
  ) {
    try {
      return await axios.get<LevelsWrapper>(environment.apiBaseUrl + 'levels', {
        params: {
          from: from,
          count: count,
          orderBy: order,
          descending: descending,
          search: searchQuery,
        },
      });
    } catch (error: any) {
      return error.response;
    }
  }

  async getLevelWithId(id: string) {
    try {
      return await axios.get<FullLevel>(
        environment.apiBaseUrl + 'levels/id/' + id
      );
    } catch (error: any) {
      return error.response;
    }
  }

  getLevelThumbnailUrl(id: string) {
    return environment.apiBaseUrl + 'levels/id/' + id + '/thumbnail';
  }

  async getLevelRelation(id: string) {
    try {
      let session = await firstValueFrom(this.session$);

      return await axios.get<LevelRelation>(
        environment.apiBaseUrl +
          'levels/id/' +
          id +
          '/users/id/' +
          session?.User.Id
      );
    } catch (error: any) {
      return error.response;
    }
  }
  async likeLevel(id: string) {
    return await axios.post(
      environment.apiBaseUrl + 'levels/id/' + id + '/like'
    );
  }

  async unLikeLevel(id: string) {
    return await axios.post(
      environment.apiBaseUrl + 'levels/id/' + id + '/unLike'
    );
  }

  async queueLevel(id: string) {
    return await axios.post(
      environment.apiBaseUrl + 'levels/id/' + id + '/queue'
    );
  }

  async unQueueLevel(id: string) {
    return await axios.post(
      environment.apiBaseUrl + 'levels/id/' + id + '/unQueue'
    );
  }

  async setLevelName(id: string, newName: string) {
    try {
      return await axios.post(
        environment.apiBaseUrl + 'levels/id/' + id + '/edit',
        {
          Name: newName,
        }
      );
    } catch (error: any) {
      return error.response;
    }
  }

  async getIpRequests(from: number, count: number, authorized: boolean) {
    return await axios.get<IpWrapper>(environment.apiBaseUrl + 'ip', {
      params: {
        from: from,
        count: count,
        authorized: authorized,
      },
    });
  }

  async authorizeIp(address: string, oneTimeUse: boolean) {
    const body: AuthorizeIpRequest = {
      IpAddress: address,
      OneTimeUse: oneTimeUse,
    };

    await axios.post(environment.apiBaseUrl + 'ip/authorize', body);
  }

  async removeAuthorizedIp(address: string) {
    await axios.post(
      environment.apiBaseUrl + 'ip/address/' + address + '/remove'
    );
  }
}
