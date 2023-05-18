import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faGear,
  faRightFromBracket,
  faUserMinus,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';
import { FollowButtonType } from 'src/app/types/follow-button-type';

@Component({
  selector: 'app-user-follow-button',
  templateUrl: './user-follow-button.component.html',
  styleUrls: ['./user-follow-button.component.scss'],
})
export class UserFollowButtonComponent {
  @Input() userId!: string;

  type: FollowButtonType | null = null;
  icon!: IconProp;

  constructor(private apiClient: ApiClientService) {}

  async ngOnInit() {
    this.apiClient.session$.subscribe((session) => {
      if (session?.User.Id == this.userId) {
        this.type = FollowButtonType.LogOut;
      }
    });

    if (this.type == null) {
      let response = await this.apiClient.checkFollowStatus(this.userId);

      if (response.data.IsFollowing === true)
        this.type = FollowButtonType.UnFollow;
      else this.type = FollowButtonType.Follow;
    }

    this.setIcon();
  }

  setIcon() {
    switch (this.type) {
      case FollowButtonType.LogOut:
        this.icon = faRightFromBracket;
        break;
      case FollowButtonType.UnFollow:
        this.icon = faUserMinus;
        break;
      case FollowButtonType.Follow:
        this.icon = faUserPlus;
        break;
    }
  }

  click() {
    switch (this.type) {
      case FollowButtonType.Follow:
        this.follow();
        break;
      case FollowButtonType.UnFollow:
        this.unFollow;
        break;
      case FollowButtonType.LogOut:
        this.logOut();
        break;
    }
  }

  async follow() {}

  async unFollow() {}

  async logOut() {
    this.apiClient.logOut();
  }
}
