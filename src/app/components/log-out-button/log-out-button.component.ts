import { Component } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-log-out-button',
  templateUrl: './log-out-button.component.html',
  styleUrls: ['./log-out-button.component.scss'],
})
export class LogOutButtonComponent {
  icon: IconProp = faRightFromBracket;

  constructor(private apiClient: ApiClientService) {}

  click() {
    this.apiClient.logOut();
  }
}
