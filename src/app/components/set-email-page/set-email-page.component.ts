import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faEnvelope, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-set-email-page',
  templateUrl: './set-email-page.component.html',
  styleUrls: ['./set-email-page.component.scss'],
})
export class SetEmailPageComponent {
  constructor(private apiClient: ApiClientService) {}

  emailCodeId: string = 'register-email-code';
  emailId: string = 'register-email';

  emailCodeIcon = faHashtag;
  emailIcon = faEnvelope;

  @Output()
  pageIndexChange = new EventEmitter<number>();

  async setEmail() {
    const emailCode = (<HTMLInputElement>(
      document.getElementById(this.emailCodeId)
    )).value;
    const email = (<HTMLInputElement>document.getElementById(this.emailId))
      .value;

    let response = await this.apiClient.setEmail(emailCode, email);
    if (response.status == 201) {
      this.pageIndexChange.emit(1);
      localStorage.setItem('email', email);
    }
  }
}
