import { Component, OnChanges, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  faClockRotateLeft,
  faHeart,
  faMusic,
  faUserPlus,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { ApiClientService } from 'src/app/services/api-client.service';
import {
  BriefLevel,
  LevelOrder,
  LevelsWrapper,
} from 'src/app/types/api/levels';
import { FullUser } from 'src/app/types/api/users';
import { FollowButtonType } from 'src/app/types/follow-button-type';
import { SidebarButton } from 'src/app/types/sidebar-button';
import { UserSidebarButtonType } from 'src/app/types/user-page-sidebar-buttons';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent {
  Buttons: SidebarButton[] = [];
  User: FullUser | undefined = undefined;
  loggedIn = false;

  private _sidebarIndex$ = new BehaviorSubject<number>(0);
  sidebarIndex$ = this._sidebarIndex$.asObservable();

  constructor(
    private route: ActivatedRoute,
    private apiClient: ApiClientService
  ) {}

  ngOnInit(): void {
    this.apiClient.isLoggedIn$.subscribe((response) => {
      this.loggedIn = response;
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      const route = params.get('route') as string;
      this.setPageIndex(route);

      const username = params.get('username') as string | undefined;
      if (username == null) return;

      this.apiClient.getUserWithUsername(username).then((response) => {
        this.User = response.data;
        this.updateButtons();
      });
    });
  }

  UserSidebarButtonType = UserSidebarButtonType;

  updateButtons() {
    this.Buttons = [
      {
        Label: 'Levels',
        Icon: faMusic,
        Count: this.User?.PublishedLevelsCount ?? 0,
        Path: `/user/${this.User?.Username}/levels`,
      },
      {
        Label: 'Following',
        Icon: faUserPlus,
        Count: this.User?.FollowingCount ?? 0,
        Path: `/user/${this.User?.Username}/following`,
      },
      {
        Label: 'Followers',
        Icon: faUsers,
        Count: this.User?.FollowersCount ?? 0,
        Path: `/user/${this.User?.Username}/followers`,
      },
      {
        Label: 'Liked Levels',
        Icon: faHeart,
        Count: this.User?.LikedLevelsCount ?? 0,
        Path: `/user/${this.User?.Username}/liked`,
      },
      {
        Label: 'Activities',
        Icon: faClockRotateLeft,
        Count: this.User?.ActivitiesCount ?? 0,
        Path: `/user/${this.User?.Username}/activities`,
      },
    ];
  }

  setPageIndex(route: string) {
    let result = UserSidebarButtonType.Levels;

    switch (route) {
      case 'levels':
        result = UserSidebarButtonType.Levels;
        break;
      case 'following':
        result = UserSidebarButtonType.Following;
        break;
      case 'followers':
        result = UserSidebarButtonType.Followers;
        break;
      case 'liked':
        result = UserSidebarButtonType.LikedLevels;
        break;
      case 'activities':
        result = UserSidebarButtonType.Activities;
        break;
    }

    this._sidebarIndex$.next(result);
    this._sidebarIndex$.subscribe((s) => {
      console.log(s);
    });
  }

  levelsWrapper: LevelsWrapper = {
    Levels: [],
    Count: 0,
  };
}
