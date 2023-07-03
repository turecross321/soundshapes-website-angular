import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SendPasswordSessionRequest, Session } from './types/account';
import {
  LoginRequest,
  SetEmailRequest,
  SetPasswordRequest,
} from './types/account';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { FullUser, UserRelation } from './types/users';
import { FullLevel, LevelOrder, LevelRelation } from './types/levels';
import { LevelsWrapper } from './types/levels';
import { AuthorizeIpRequest, IpWrapper } from './types/ip';
import { environment } from 'src/environments/environment';
import { DoPunishmentsIncludeBan } from './types/punishments';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiClientService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private _session$ = new BehaviorSubject<Session | undefined>(undefined);
  session$ = this._session$.asObservable();
  sessionId: string | undefined;

  platformId!: Object;
  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;

    if (isPlatformBrowser(this.platformId)) this.logInAutomatically();
  }

  logInAutomatically() {
    // Check if there is a saved session
    const sessionString = localStorage.getItem('session');
    if (sessionString != null) {
      const session = JSON.parse(sessionString) as Session;

      // Check if saved session has expired
      const expiryDate = new Date(session.ExpiryDate * 1000);

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
          this.logIn(email, passwordSha512).catch((response) => {
            localStorage.removeItem('passwordSha512');
          });
        }
      }
    }
  }

  async logIn(email: string, hash: string, saveLogin: boolean = true) {
    const body: LoginRequest = {
      Email: email,
      PasswordSha512: hash,
    };

    const response = await firstValueFrom(
      this.httpClient.post<Session>(
        environment.apiBaseUrl + 'account/logIn',
        body
      )
    );

    if (DoPunishmentsIncludeBan(response.ActivePunishments)) return response;

    if (saveLogin) {
      this.finishLogIn(response);
      localStorage.setItem('email', email);
      localStorage.setItem('passwordSha512', hash);
    }

    return response;
  }

  finishLogIn(session: Session) {
    this._isLoggedIn$.next(true);
    this._session$.next(session);

    localStorage.setItem('session', JSON.stringify(session));
    this.sessionId = session.Id;
  }

  logOut() {
    try {
      this.httpClient.post(environment.apiBaseUrl + 'account/logOut', null);
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

    return await firstValueFrom(
      this.httpClient.post(
        environment.apiBaseUrl + 'account/setEmail',
        body,
        {
          headers: {
            Authorization: emailCode,
          },
        }
      )
    );
  }

  async sendPasswordSession(email: string) {
    const body: SendPasswordSessionRequest = {
      Email: email,
    };

    return await firstValueFrom(
      this.httpClient.post(
        environment.apiBaseUrl + 'account/sendPasswordSession',
        body
      )
    );
  }
  async sendAccountRemovalSession(sessionId: string) {
    return await firstValueFrom(
      this.httpClient.post(
        environment.apiBaseUrl + 'account/sendRemovalSession',
        null,
        {
          headers: {
            Authorization: sessionId,
          },
        }
      )
    );
  }

  async removeAccount(removalCode: string) {
    return await firstValueFrom(
      this.httpClient.post(environment.apiBaseUrl + 'account/remove', null, {
        headers: {
          Authorization: removalCode,
        },
      })
    );
  }

  async setPassword(passwordCode: string, hash: string) {
    const body: SetPasswordRequest = {
      NewPasswordSha512: hash,
    };

    return await firstValueFrom(
      this.httpClient.post(
        environment.apiBaseUrl + 'account/setPassword',
        body,
        {
          headers: {
            Authorization: passwordCode.toUpperCase(),
          },
        }
      )
    );
  }

  async getUserWithUsername(username: string) {
    return await firstValueFrom(
      this.httpClient.get<FullUser>(
        environment.apiBaseUrl + 'users/username/' + username
      )
    );
  }

  async getUserRelation(userId: string) {
    let session = await firstValueFrom(this.session$);

    return await firstValueFrom(
      this.httpClient.get<UserRelation>(
        environment.apiBaseUrl +
        'users/id/' +
        userId +
        '/users/id/' +
        session?.User.Id
      )
    );
  }

  async followUser(id: string) {
    return await firstValueFrom(
      this.httpClient.post(
        environment.apiBaseUrl + 'users/id/' + id + '/follow',
        null
      )
    );
  }

  async unFollowUser(id: string) {
    return await firstValueFrom(
      this.httpClient.post(
        environment.apiBaseUrl + 'users/id/' + id + '/unFollow',
        null
      )
    );
  }

  async getLevels(
    from: number,
    count: number,
    order: LevelOrder,
    descending: boolean,
    filters: {
      [param: string]:
        | string
        | number
        | boolean
        | readonly (string | number | boolean)[];
    }
  ) {
    let params = new HttpParams();

    // Add the existing parameters
    params = params.set('from', from);
    params = params.set('count', count.toString());
    params = params.set('orderBy', order);
    params = params.set('descending', descending.toString());

    params = params.appendAll(filters);

    return await firstValueFrom(
      this.httpClient.get<LevelsWrapper>(environment.apiBaseUrl + 'levels', {
        params: params,
      })
    );
  }

  async getLevelWithId(id: string) {
    return await firstValueFrom(
      this.httpClient.get<FullLevel>(
        environment.apiBaseUrl + 'levels/id/' + id
      )
    );
  }

  getLevelThumbnailUrl(id: string) {
    return environment.apiBaseUrl + 'levels/id/' + id + '/thumbnail';
  }

  async getLevelRelation(id: string) {
    let session = await firstValueFrom(this.session$);

    return await firstValueFrom(
      this.httpClient.get<LevelRelation>(
        environment.apiBaseUrl +
        'levels/id/' +
        id +
        '/users/id/' +
        session?.User.Id
      )
    );
  }
  async likeLevel(id: string) {
    return await firstValueFrom(
      this.httpClient.post(
        environment.apiBaseUrl + 'levels/id/' + id + '/like',
        null
      )
    );
  }

  async unLikeLevel(id: string) {
    return await firstValueFrom(
      this.httpClient.post(
        environment.apiBaseUrl + 'levels/id/' + id + '/unLike',
        null
      )
    );
  }

  async queueLevel(id: string) {
    return await firstValueFrom(
      this.httpClient.post(
        environment.apiBaseUrl + 'levels/id/' + id + '/queue',
        null
      )
    );
  }

  async unQueueLevel(id: string) {
    return await firstValueFrom(
      this.httpClient.post(
        environment.apiBaseUrl + 'levels/id/' + id + '/unQueue',
        null
      )
    );
  }

  async setLevelName(id: string, newName: string) {
    return await firstValueFrom(
      this.httpClient.post(
        environment.apiBaseUrl + 'levels/id/' + id + '/edit',
        {
          Name: newName,
        }
      )
    );
  }

  async getIpRequests(from: number, count: number, authorized: boolean) {
    return await firstValueFrom(
      this.httpClient.get<IpWrapper>(environment.apiBaseUrl + 'ip', {
        params: {
          from: from,
          count: count,
          authorized: authorized,
        },
      })
    );
  }

  async authorizeIp(address: string, oneTimeUse: boolean) {
    const body: AuthorizeIpRequest = {
      IpAddress: address,
      OneTimeUse: oneTimeUse,
    };

    await firstValueFrom(
      this.httpClient.post(environment.apiBaseUrl + 'ip/authorize', body)
    );
  }

  async removeAuthorizedIp(address: string) {
    await firstValueFrom(
      this.httpClient.post(
        environment.apiBaseUrl + 'ip/address/' + address + '/remove',
        null
      )
    );
  }
}
