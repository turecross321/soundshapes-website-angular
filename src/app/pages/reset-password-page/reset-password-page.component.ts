import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss'],
})
export class ResetPasswordPageComponent {
  constructor(private router: Router) {}

  emailAddress!: string;

  PageIndex = 0;

  sentCode(email: string): void {
    this.emailAddress = email;
    this.PageIndex = 1;
  }

  onFinishedRegistration(): void {
    this.router.navigate(['/login']);
  }
}
