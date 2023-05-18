import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  constructor(private apiClient: ApiClientService, private router: Router) {}

  PageIndex = 0;

  onPageIndexChange(newPageIndex: number): void {
    this.PageIndex = newPageIndex;
  }

  onFinishedRegistration(): void {
    this.router.navigate(['/login']);
  }
}
