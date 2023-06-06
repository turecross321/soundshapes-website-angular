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
  faCompactDisc,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';
import { PermissionsType } from 'src/app/types/api/users';
import { NavbarButton } from 'src/app/types/navbar-button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public apiClient: ApiClientService) {}

  notLoggedInButtons: NavbarButton[] = [
    { Path: '/login', Icon: faRightToBracket, Label: 'Login' },
  ];

  loggedInButtonPreset: NavbarButton[] = [
    { Path: '/authorization/pending', Icon: faKey, Label: 'Authorization' },
  ];

  leftButtons: NavbarButton[] = [
    { Path: '/', Icon: faHouseChimney, Label: 'Home' },
    { Path: '/levels', Icon: faMusic, Label: 'Levels' },
    { Path: '/albums', Icon: faCompactDisc, Label: 'Albums' },
    { Path: '/users', Icon: faUsers, Label: 'Users' },
  ];

  rightButtons!: NavbarButton[];

  ngOnInit() {
    this.apiClient.isLoggedIn$.subscribe((loggedIn) => {
      this.apiClient.session$.subscribe((session) => {
        if (loggedIn && session) {
          this.rightButtons = [
            ...this.loggedInButtonPreset,
            {
              Path: 'user/' + session?.User.Username,
              Icon: faUser,
              Label: session.User.Username,
            },
          ];

          if (session.User.PermissionsType == PermissionsType.Administrator) {
            this.rightButtons = [
              {
                Path: '/admin',
                Icon: faWrench,
                Label: 'Administration',
              },
              ...this.rightButtons,
            ];
          }
        } else this.rightButtons = this.notLoggedInButtons;
      });
    });
  }
}
