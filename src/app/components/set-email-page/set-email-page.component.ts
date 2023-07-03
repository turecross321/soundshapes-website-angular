import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faEnvelope, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/api/api-client.service';
import { InputType } from 'src/app/types/input-type';

@Component({
  selector: 'app-set-email-page',
  templateUrl: './set-email-page.component.html',
  styleUrls: ['./set-email-page.component.scss'],
})
export class SetEmailPageComponent {
  constructor(private apiClient: ApiClientService) {}

  emailCodeId: string = 'register-email-code';
  emailId: string = 'register-email';
  emailCodeInputType = InputType.EmailCode;
  emailInputType = InputType.Email;

  errorMessage: string | null = null;

  emailCodeIcon = faHashtag;
  emailIcon = faEnvelope;

  @Output()
  sentCode = new EventEmitter<string>();

  async setEmail() {
    const emailCode = (<HTMLInputElement>(
      document.getElementById(this.emailCodeId)
    )).value;
    const email = (<HTMLInputElement>document.getElementById(this.emailId))
      .value;

    try {
      let response = await this.apiClient.setEmail(emailCode, email);
      this.sentCode.emit(email);
      localStorage.setItem('email', email);
    } catch (e: any) {
      if (e.data) {
        this.errorMessage = e.data;
      } else if (e.status == 403) {
        this.errorMessage = 'Incorrect Email Code.';
      } else {
        this.errorMessage = 'An error has occurred.';
      }
    }
  }
}
