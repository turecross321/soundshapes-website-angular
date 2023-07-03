import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  DoPunishmentsIncludeBan,
  Punishment,
} from 'src/app/api/types/punishments';
import { Session } from 'src/app/api/types/account';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  banned: boolean = false;
  punishments: Punishment[] = [];

  constructor(private router: Router) {}

  onLoggedIn(session: Session) {
    if (session.ActivePunishments.length > 0) {
      this.banned = DoPunishmentsIncludeBan(session.ActivePunishments);
      this.punishments = session.ActivePunishments;
    } else {
      this.router.navigate(['user/' + session.User.Username]);
    }
  }
}
