import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faMusic, faUsers } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceStrict } from 'date-fns';
import { ApiClientService } from 'src/app/api/api-client.service';
import { LevelOrder, LevelsWrapper } from 'src/app/api/types/levels';
import { FullUser, UserRelation } from 'src/app/api/types/users';
import { SidebarButton } from 'src/app/types/sidebar-button';

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

  lastActiveDate: Date | undefined;

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

        this.user = await this.apiClient.getUserWithUsername(username);

        if (this.user == null) {
          await this.router.navigate(['/404']);
          return;
        }

        this.lastActiveDate = new Date(this.user.LastEventDate * 1000);

        this.lastActive =
          'Last active ' +
          formatDistanceStrict(this.lastActiveDate, new Date(), {
            addSuffix: true,
          });

        if (!this.myAccount && this.loggedIn) {
          this.relation = await this.apiClient.getUserRelation(this.user.Id);
        }

        if (this.user.PublishedLevels > 0) {
          this.createdByParams = {
            createdBy: this.user.Id,
          };

          this.publishedLevels = await this.apiClient.getLevels(
            0,
            3,
            LevelOrder.CreationDate,
            true,
            this.createdByParams
          );
        }

        if (this.user.LikedLevels > 0) {
          this.likedByParams = {
            likedBy: this.user.Id,
          };

          this.likedLevels = await this.apiClient.getLevels(
            0,
            3,
            LevelOrder.CreationDate,
            true,
            this.likedByParams
          );
        }

        if (this.user.QueuedLevels > 0) {
          this.queuedByParams = {
            queuedBy: this.user.Id,
          };

          this.queuedLevels = await this.apiClient.getLevels(
            0,
            3,
            LevelOrder.CreationDate,
            true,
            this.queuedByParams
          );
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
