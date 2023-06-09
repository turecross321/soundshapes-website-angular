import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faClock,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/api/api-client.service';
import { IpWrapper } from 'src/app/api/types/ip';
import { SelectableButton } from 'src/app/types/selectable-button';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.scss'],
})
export class AuthorizationPageComponent {
  filter!: Filter;
  requests: null | IpWrapper = null;
  loading: boolean = true;
  page: number = 0;
  totalPages: number = 0;

  arrowLeft = faArrowLeft;
  arrowRight = faArrowRight;
  refreshIcon = faRefresh;

  buttons: SelectableButton[] = [
    {
      Label: 'Pending',
      Icon: faClock,
    },
    {
      Label: 'Authorized',
      Icon: faCheck,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: ApiClientService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let filter = params.get('filter') as string | undefined;

      if (filter === 'pending') {
        this.filter = Filter.Pending;
        this.loadPending();
      } else if (filter === 'authorized') {
        this.filter = Filter.Authorized;
        this.loadAuthorized();
      } else this.router.navigate(['/404']);
    });
  }

  pageSize = 10;

  async goToPage(pageIndex: number) {
    this.page = pageIndex;
    await this.refresh();
  }

  async loadPending() {
    this.requests = await this.getRequests(0, false);
  }
  async loadAuthorized() {
    this.requests = await this.getRequests(0, true);
  }

  setFilter(event: any) {
    this.filter = event;
    if (this.filter == Filter.Pending) {
      this.loadPending();
      this.router.navigate(['/authorization/pending']);
    } else if (this.filter == Filter.Authorized) {
      this.loadAuthorized();
      this.router.navigate(['/authorization/authorized']);
    }
  }

  async refresh() {
    if (this.filter == Filter.Authorized) {
      this.requests = await this.getRequests(this.page, true);
    } else {
      this.requests = await this.getRequests(this.page, false);
    }
  }

  async authorizeIp(address: string, oneTimeUse: boolean) {
    const index = this.requests?.IpAddresses.findIndex(
      (item) => item.IpAddress === address
    );

    if (index !== undefined) {
      this.requests?.IpAddresses.splice(index, 1);
    }

    this.apiClient.authorizeIp(address, oneTimeUse);
  }

  async removeIp(address: string) {
    const index = this.requests?.IpAddresses.findIndex(
      (item) => item.IpAddress === address
    );

    if (index !== undefined) {
      this.requests?.IpAddresses.splice(index, 1);
    }

    this.apiClient.removeAuthorizedIp(address);
  }

  async getRequests(page: number, authorized: boolean) {
    this.loading = true;
    const response = await this.apiClient.getIpRequests(
      page * this.pageSize,
      this.pageSize,
      authorized
    );

    this.totalPages = Math.ceil((response.Count ?? 0) / this.pageSize);

    this.loading = false;
    return response;
  }
}

enum Filter {
  Pending = 0,
  Authorized = 1,
}
