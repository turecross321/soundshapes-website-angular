import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/app/services/api-client.service';
import { sha512Async } from 'src/app/hash';
import { InputType } from 'src/app/types/input-type';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import {
  DoPunishmentsIncludeBan,
  Punishment,
} from 'src/app/types/api/punishments';
import { Session } from 'src/app/types/api/account';

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
