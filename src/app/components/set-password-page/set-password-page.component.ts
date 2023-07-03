import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/api/api-client.service';
import { sha512Async } from 'src/app/hash';
import { InputType } from 'src/app/types/input-type';
import { faHashtag, faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-set-password-page',
  templateUrl: './set-password-page.component.html',
  styleUrls: ['./set-password-page.component.scss'],
})
export class SetPasswordPageComponent {
  @Input() emailAddress!: string;

  passwordCodeId: string = 'register-password-code';
  passwordId: string = 'register-password';

  passwordCodeInputType = InputType.PasswordCode;
  passwordInputType = InputType.Password;

  passwordCodeIcon = faHashtag;
  passwordIcon = faKey;

  errorMessage: string | null = null;

  @Output()
  onFinishedRegistration = new EventEmitter();

  constructor(private apiClient: ApiClientService) {}

  async setPassword() {
    const code = (<HTMLInputElement>(
      document.getElementById(this.passwordCodeId)
    )).value;
    const password = (<HTMLInputElement>(
      document.getElementById(this.passwordId)
    )).value;

    const hash = await sha512Async(password);

    try {
      let response = await this.apiClient.setPassword(code, hash);
      this.onFinishedRegistration.emit();
      localStorage.setItem('passwordSha512', hash);
    } catch (e: any) {
      if (e.status == 403) {
        this.errorMessage = 'Incorrect Password Code.';
      } else {
        this.errorMessage = 'An error has occurred.';
      }
    }
  }
}
