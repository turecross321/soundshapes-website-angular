import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiClientService } from 'src/app/services/api-client.service';
import { IpWrapper } from 'src/app/types/api/ip';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.scss'],
})
export class AuthorizationPageComponent {
  page!: Page;
  requests: null | IpWrapper = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: ApiClientService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let filter = params.get('filter') as string | undefined;

      console.log(filter);

      if (filter === 'pending') this.page = Page.Pending;
      else if (filter === 'authorized') this.page = Page.Authorized;
      else this.router.navigate(['/404']);
    });
  }

  async ngOnInit() {}

  loadPending() {
    console.log("w'alls pending");
  }
  loadAuthorized() {
    console.log('walls authorized');
  }
}

enum Page {
  Pending = 0,
  Authorized = 1,
}
