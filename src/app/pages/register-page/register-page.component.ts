import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/app/api/api-client.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  constructor(private router: Router) {}

  emailAddress!: string;
  pageIndex = 0;

  sentCode(email: string): void {
    this.emailAddress = email;
    this.pageIndex = 1;
  }

  onFinishedRegistration(): void {
    this.router.navigate(['/login']);
  }
}
