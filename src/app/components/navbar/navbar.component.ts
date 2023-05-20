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

  loggedInButtons: NavbarButton[] = [
    { Path: '/authorization', Icon: faKey, Label: 'Authorization' },
    { Path: '/me', Icon: faUser, Label: 'Profile' },
  ];

  globalButtons: NavbarButton[] = [
    { Path: '/', Icon: faHouseChimney, Label: 'Home' },
    { Path: '/levels', Icon: faMusic, Label: 'Levels' },
    { Path: '/albums', Icon: faFolderOpen, Label: 'Albums' },
    { Path: '/users', Icon: faUsers, Label: 'Users' },
  ];

  buttons: NavbarButton[] = [...this.globalButtons];

  ngOnInit() {
    this.apiClient.isLoggedIn$.subscribe((loggedIn) => {
      if (loggedIn)
        this.buttons = [...this.globalButtons, ...this.loggedInButtons];
      else this.buttons = [...this.globalButtons, ...this.notLoggedInButtons];
    });
  }
}
