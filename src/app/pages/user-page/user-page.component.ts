import { Component, OnChanges, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faMusic, faUsers } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceStrict } from 'date-fns';
import { ApiClientService } from 'src/app/services/api-client.service';
import { LevelsWrapper } from 'src/app/types/api/levels';
import { FullUser } from 'src/app/types/api/users';
import { SidebarButton } from 'src/app/types/sidebar-button';
import { UserSidebarButtonType } from 'src/app/types/user-page-sidebar-buttons';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent {
  buttons: SidebarButton[] = [];
  user: FullUser | undefined = undefined;
  loggedIn = false;

  followersIcon = faUsers;
  levelsIcon = faMusic;

  joined!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: ApiClientService
  ) {}

  ngOnInit(): void {
    this.apiClient.isLoggedIn$.subscribe((response) => {
      this.loggedIn = response;
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      let username = params.get('username') as string | undefined;

      this.apiClient.session$.subscribe((session) => {
        username ??= session?.User.Username;
      });

      if (username == null) return;

      this.apiClient.getUserWithUsername(username).then((response) => {
        if (response.status != 200) this.router.navigate(['/404']);

        this.user = response.data;
        if (this.user == null) return;

        this.joined =
        'Joined ' +
        formatDistanceStrict(new Date(this.user.CreationDate), new Date(), {
          addSuffix: true,
        });
      });
    });
  }

  levelsWrapper: LevelsWrapper = {
    Levels: [],
    Count: 0,
  };
}
