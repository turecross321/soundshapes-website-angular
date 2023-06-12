import { Component, OnChanges, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { faMusic, faUsers } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceStrict } from 'date-fns';
import { firstValueFrom } from 'rxjs';
import { ApiClientService } from 'src/app/services/api-client.service';
import { LevelOrder, LevelsWrapper } from 'src/app/types/api/levels';
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

  lastActive!: string;

  publishedLevels: LevelsWrapper | null = null;
  createdByParams!: Params;

  likedLevels: LevelsWrapper | null = null;
  likedByParams!: Params;

  queuedLevels: LevelsWrapper | null = null;
  queuedByParams!: Params;

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
        this.relation = undefined;

        username ??= session?.User.Username;
        if (username == null) return;
        this.myAccount = session?.User.Username == username;

        const response = await this.apiClient.getUserWithUsername(username);
        this.user = response;

        if (this.user == null) {
          this.router.navigate(['/404']);
          return;
        }

        this.lastActive =
          'Last active ' +
          formatDistanceStrict(new Date(this.user.LastEventDate), new Date(), {
            addSuffix: true,
          });

        if (!this.myAccount && this.loggedIn) {
          const relationResponse = await this.apiClient.getUserRelation(
            this.user.Id
          );
          this.relation = relationResponse.data;
        }

        if (this.user.PublishedLevels > 0) {
          this.createdByParams = {
            createdBy: this.user.Id,
          };

          const response = await this.apiClient.getLevels(
            0,
            3,
            LevelOrder.CreationDate,
            true,
            this.createdByParams
          );

          this.publishedLevels = response.data;
        }

        if (this.user.LikedLevels > 0) {
          this.likedByParams = {
            likedBy: this.user.Id,
          };

          const response = await this.apiClient.getLevels(
            0,
            3,
            LevelOrder.CreationDate,
            true,
            this.likedByParams
          );

          this.likedLevels = response.data;
        }

        if (this.user.QueuedLevels > 0) {
          this.queuedByParams = {
            queuedBy: this.user.Id,
          };

          const response = await this.apiClient.getLevels(
            0,
            3,
            LevelOrder.CreationDate,
            true,
            this.queuedByParams
          );

          this.queuedLevels = response.data;
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
