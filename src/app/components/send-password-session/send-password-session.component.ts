import { Component, EventEmitter, Output } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';
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

  async sendPasswordSession() {
    const email = (<HTMLInputElement>document.getElementById(this.emailId))
      .value;

    this.apiClient.sendPasswordSession(email);
    this.sentCode.emit(email);
    localStorage.setItem('email', email);
  }
}
