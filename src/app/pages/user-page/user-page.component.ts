import { Component, OnChanges, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faMusic, faUsers } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceStrict } from 'date-fns';
import { firstValueFrom } from 'rxjs';
import { ApiClientService } from 'src/app/services/api-client.service';
import { LevelsWrapper } from 'src/app/types/api/levels';
import { FullUser, UserRelation } from 'src/app/types/api/users';
import { SidebarButton } from 'src/app/types/sidebar-button';
import { UserSidebarButtonType } from 'src/app/types/user-page-sidebar-buttons';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent {
  loading: boolean = true;
  buttons: SidebarButton[] = [];
  user: FullUser | undefined = undefined;
  loggedIn = false;
  myAccount: boolean = false;
  relation: UserRelation | undefined = undefined;

  followersIcon = faUsers;
  levelsIcon = faMusic;

  joined!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: ApiClientService
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let username = params.get('username') as string | undefined;

      this.apiClient.isLoggedIn$.subscribe((loggedIn) => {
        this.loggedIn = loggedIn;
      });

      this.apiClient.session$.subscribe(async (session) => {
        username ??= session?.User.Username;
        if (username == null) return;
        this.myAccount = session?.User.Username == username;

        const response = await this.apiClient.getUserWithUsername(username);
        if (response.status != 200) this.router.navigate(['/404']);

        this.user = response.data;
        if (this.user == null) return;

        this.joined =
          'Joined ' +
          formatDistanceStrict(new Date(this.user.CreationDate), new Date(), {
            addSuffix: true,
          });

        if (!this.myAccount) {
          const relationResponse = await this.apiClient.getUserRelation(
            this.user.Id
          );
          this.relation = relationResponse.data;
        }

        this.loading = false;
      });
    });
  }

  levelsWrapper: LevelsWrapper = {
    Levels: [],
    Count: 0,
  };
}
