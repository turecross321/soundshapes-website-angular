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

  @Output()
  onFinishedRegistration = new EventEmitter();

  constructor(private apiClient: ApiClientService, private router: Router) {}

  async removeAccount() {
    const code = (<HTMLInputElement>document.getElementById(this.removalCodeId))
      .value;

    const response = await this.apiClient.removeAccount(code);
    this.router.navigate(['/']);
  }
}
