import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { sha512Async } from 'src/app/hash';
import { ApiClientService } from 'src/app/services/api-client.service';
import { Session } from 'src/app/types/api/account';
import {
  Punishment,
  DoPunishmentsIncludeBan,
} from 'src/app/types/api/punishments';
import { InputType } from 'src/app/types/input-type';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  emailId: string = 'login-email';
  passwordId: string = 'login-password';

  errorMessage = null;

  emailInputType: InputType = InputType.Email;
  passwordInputType: InputType = InputType.Password;

  emailIcon = faEnvelope;
  passwordIcon = faKey;

  @Output() loggedInSession: EventEmitter<Session> =
    new EventEmitter<Session>();
  @Output() loggedInEmail: EventEmitter<string> = new EventEmitter<string>();

  constructor(private apiClientService: ApiClientService) {}

  ngOnInit(): void {}

  async logIn() {
    const emailInput: string = (<HTMLInputElement>(
      document.getElementById(this.emailId)
    )).value;
    const passwordInput: string = (<HTMLInputElement>(
      document.getElementById(this.passwordId)
    )).value;

    const hash = await sha512Async(passwordInput);
    const response = await this.apiClientService.logIn(emailInput, hash);
    if (response.status != 200) {
      this.errorMessage = response.data;
    } else {
      this.loggedInSession.next(response.data);
      this.loggedInEmail.next(emailInput);
    }
  }
}
