import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/config';
import { SendPasswordSessionRequest, Session } from '../types/api/account';
import {
  LoginRequest,
  SetEmailRequest,
  SetPasswordRequest,
} from '../types/api/account';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import axios from 'axios';
import { FullUser, UserRelation } from '../types/api/users';
import { FullLevel, LevelOrder, LevelRelation } from '../types/api/levels';
import { LevelsWrapper } from '../types/api/levels';
import { AuthorizeIpRequest, IpWrapper } from '../types/api/ip';

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

  async logIn(email: string, hash: string) {
    const body: LoginRequest = {
      Email: email,
      PasswordSha512: hash,
    };

    try {
      const response = await axios.post<Session>(
        ApiUrl + 'account/login',
        body
      );

      this.finishLogIn(response.data);
      localStorage.setItem('email', email);
      localStorage.setItem('passwordSha512', hash);

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

  async logOut() {
    try {
      await axios.post(ApiUrl + 'account/logout');
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
      const response = await axios.post(ApiUrl + 'account/setEmail', body, {
        headers: {
          Authorization: emailCode,
        },
      });

      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async sendPasswordSession(email: string) {
    const body: SendPasswordSessionRequest = {
      Email: email,
    };

    return await axios.post(ApiUrl + 'account/sendPasswordSession', body);
  }

  async setPassword(passwordCode: string, hash: string) {
    const body: SetPasswordRequest = {
      NewPasswordSha512: hash,
    };

    return axios.post(ApiUrl + 'account/setPassword', body, {
      headers: {
        Authorization: passwordCode.toUpperCase(),
      },
    });
  }

  async getUserWithUsername(username: string) {
    try {
      return await axios.get<FullUser>(ApiUrl + 'users/username/' + username);
    } catch (error: any) {
      return error.response;
    }
  }

  async checkFollowStatus(userId: string) {
    try {
      let session = await firstValueFrom(this.session$);

      return await axios.get<UserRelation>(
        ApiUrl + 'users/id/' + userId + '/users/id/' + session?.User.Id
      );
    } catch (error: any) {
      return error.response;
    }
  }

  async getLevels(
    from: number,
    count: number,
    order: LevelOrder,
    descending: boolean,
    searchQuery?: string
  ) {
    try {
      return await axios.get<LevelsWrapper>(ApiUrl + 'levels', {
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
      return await axios.get<FullLevel>(ApiUrl + 'levels/id/' + id);
    } catch (error: any) {
      return error.response;
    }
  }
  async getLevelRelation(id: string) {
    try {
      let session = await firstValueFrom(this.session$);

      return await axios.get<LevelRelation>(
        ApiUrl + 'levels/id/' + id + '/users/id/' + session?.User.Id
      );
    } catch (error: any) {
      return error.response;
    }
  }
  async likeLevel(id: string) {
    return await axios.post(ApiUrl + 'levels/id/' + id + '/like');
  }

  async unLikeLevel(id: string) {
    return await axios.post(ApiUrl + 'levels/id/' + id + '/unLike');
  }

  async setLevelName(id: string, newName: string) {
    try {
      return await axios.post(ApiUrl + 'levels/id/' + id + '/edit', {
        Name: newName,
      });
    } catch (error: any) {
      return error.response;
    }
  }

  async getIpRequests(from: number, count: number, authorized: boolean) {
    return await axios.get<IpWrapper>(ApiUrl + 'ip/addresses', {
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

    await axios.post(ApiUrl + 'ip/authorize', body);
  }

  async removeAuthorizedIp(address: string) {
    await axios.post(ApiUrl + 'ip/' + address + '/remove');
  }
}
