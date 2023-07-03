import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { sha512Async } from 'src/app/hash';
import { ApiClientService } from 'src/app/api/api-client.service';
import { Session } from 'src/app/api/types/account';
import { InputType } from 'src/app/types/input-type';
import { ERROR } from '@angular/compiler-cli/src/ngtsc/logging/src/console_logger';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  emailId: string = 'login-email';
  passwordId: string = 'login-password';

  errorMessage: string | null = null;

  emailInputType: InputType = InputType.Email;
  passwordInputType: InputType = InputType.Password;

  emailIcon = faEnvelope;
  passwordIcon = faKey;

  savedEmail: string = '';

  @Output() loggedInSession: EventEmitter<Session> =
    new EventEmitter<Session>();
  @Output() loggedInEmail: EventEmitter<string> = new EventEmitter<string>();
  @Input() saveLogin: boolean = true;

  constructor(private apiClientService: ApiClientService) {}

  ngOnInit(): void {
    this.savedEmail = localStorage.getItem('email') ?? '';
  }

  async logIn() {
    this.errorMessage = null;

    const emailInput: string = (<HTMLInputElement>(
      document.getElementById(this.emailId)
    )).value;
    const passwordInput: string = (<HTMLInputElement>(
      document.getElementById(this.passwordId)
    )).value;

    const hash = await sha512Async(passwordInput);
    try {
      const response = await this.apiClientService.logIn(
        emailInput,
        hash,
        this.saveLogin
      );
      this.loggedInSession.next(response);
      this.loggedInEmail.next(emailInput);
    } catch (error: any) {
      if (error.status == 403) {
        this.errorMessage = error.error;
      } else {
        this.errorMessage = 'An error has occurred.';
      }
    }
  }
}
