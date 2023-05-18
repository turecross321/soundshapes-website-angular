import { Component } from '@angular/core';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
import {
  faHouseChimney,
  faMusic,
  faFolderOpen,
  faUsers,
  faRightToBracket,
  faUser,
  faKey,
} from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';
import { Session } from 'src/app/types/api/account';
import { BriefUser } from 'src/app/types/api/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public apiClient: ApiClientService) {
    apiClient.session$.subscribe((session) => {
      this.setProfilePath(session);
    });
  }

  HomeIcon = faHouseChimney;
  HomePath = '/';

  LevelsIcon = faMusic;
  LevelsPath = '/levels';

  AlbumsIcon = faFolderOpen;
  AlbumsPath = '/albums';

  UsersIcon = faUsers;
  UsersPath = '/users';

  LogInIcon = faRightToBracket;
  LogInPath = '/login';

  AuthorizationIcon = faKey;
  AuthorizationPath = '/authorization';

  setProfilePath(session: Session | undefined) {
    if (session != undefined) {
      this.MyProfilePath = '/user/' + session?.User.Username;
    }
  }

  MyProfileIcon = faUser;
  MyProfilePath = `/user/`;
}
