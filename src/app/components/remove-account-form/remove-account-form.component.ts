import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/api/api-client.service';
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

    try {
      const response = await this.apiClient.removeAccount(code);
      this.router.navigate(['/']);
    }
    catch (e : any) {
      if (e.status == 403) {
        this.errorMessage = 'Incorrect Account Removal Code.';
      } else {
        this.errorMessage = 'An error has occurred.';
      }
    }
  }
}
