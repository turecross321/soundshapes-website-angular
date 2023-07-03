import { Component, EventEmitter, Output } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/api/api-client.service';
import { InputType } from 'src/app/types/input-type';

@Component({
  selector: 'app-send-password-session',
  templateUrl: './send-password-session.component.html',
  styleUrls: ['./send-password-session.component.scss'],
})
export class SendPasswordSessionComponent {
  constructor(private apiClient: ApiClientService) {}

  emailId: string = 'register-email';
  emailInputType = InputType.Email;
  emailIcon = faEnvelope;
  @Output()
  sentCode = new EventEmitter<string>();
  errorMessage: string | null = null;

  async sendPasswordSession() {
    this.errorMessage = null;
    const email = (<HTMLInputElement>document.getElementById(this.emailId))
      .value;

    try {
      await this.apiClient.sendPasswordSession(email);
      this.sentCode.emit(email);
      localStorage.setItem('email', email);
    } catch (e) {
      this.errorMessage = 'An error occurred. Please try again.';
    }
  }
}
