import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';
import { InputType } from 'src/app/types/input-type';

@Component({
  selector: 'app-remove-account-form',
  templateUrl: './remove-account-form.component.html',
  styleUrls: ['./remove-account-form.component.scss'],
})
export class RemoveAccountFormComponent {
  @Input() emailAddress!: string;

  removalCodeId: string = 'register-password-code';
  removalId: string = 'register-password';

  removalCodeInputType = InputType.RemovalCode;
  removalCodeIcon = faHashtag;

  errorMessage: string | null = null;

  @Output()
  onFinishedRegistration = new EventEmitter();

  constructor(private apiClient: ApiClientService, private router: Router) {}

  async removeAccount() {
    const code = (<HTMLInputElement>document.getElementById(this.removalCodeId))
      .value;

    const response = await this.apiClient.removeAccount(code);
    if (response.status == 200) {
      this.router.navigate(['/']);
    } else if (response.status == 403) {
      this.errorMessage = 'Incorrect Account Removal Code.';
    } else {
      this.errorMessage = 'An error has occurred.';
    }
  }
}
