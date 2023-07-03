import { Component } from '@angular/core';
import { ApiClientService } from 'src/app/api/api-client.service';
import { Session } from 'src/app/api/types/account';

@Component({
  selector: 'app-remove-account-page',
  templateUrl: './remove-account-page.component.html',
  styleUrls: ['./remove-account-page.component.scss'],
})
export class RemoveAccountPageComponent {
  session: Session | null = null;
  emailAddress: string = '';
  pageIndex: number = 0;

  constructor(private apiClient: ApiClientService) {}

  onReadWarning() {
    this.pageIndex = 1;
  }

  async onLoggedInSession(session: Session) {
    this.session = session;
    await this.apiClient.sendAccountRemovalSession(this.session.Id);
    this.pageIndex = 2;
  }

  async onLoggedInEmail(email: string) {
    this.emailAddress = email;
  }
}
