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
    const params: ParamMap = await firstValueFrom(this.route.paramMap);
    let username = params.get('username') as string | undefined;

    const loggedIn = await firstValueFrom(this.apiClient.isLoggedIn$);
    this.loggedIn = loggedIn;

    const session = await firstValueFrom(this.apiClient.session$);
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

    const relationResponse = await this.apiClient.getUserRelation(this.user.Id);
    this.relation = relationResponse.data;
  }

  levelsWrapper: LevelsWrapper = {
    Levels: [],
    Count: 0,
  };
}
