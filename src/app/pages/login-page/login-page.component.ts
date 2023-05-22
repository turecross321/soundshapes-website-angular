import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/app/services/api-client.service';
import { sha512Async } from 'src/app/hash';
import { InputType } from 'src/app/types/input-type';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  emailId: string = 'login-email';
  passwordId: string = 'login-password';

  errorMessage = null;

  EmailInputType: InputType = InputType.Email;
  PasswordInputType: InputType = InputType.Password;

  emailIcon = faEnvelope;
  passwordIcon = faKey;

  constructor(
    private apiClientService: ApiClientService,
    private router: Router
  ) {}

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
      this.router.navigate(['user/' + response.data.User.Username]);
    }
  }
}
