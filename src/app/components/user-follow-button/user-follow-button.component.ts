import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';
import { FullUser } from 'src/app/types/api/users';

@Component({
  selector: 'app-user-follow-button',
  templateUrl: './user-follow-button.component.html',
  styleUrls: ['./user-follow-button.component.scss'],
})
export class UserFollowButtonComponent {
  @Input() user!: FullUser;

  isFollowing: boolean = false;
  icon: IconProp = faUserPlus;

  constructor(private apiClient: ApiClientService) {}

  async ngOnInit() {
    let response = await this.apiClient.checkFollowStatus(this.user.Id);

    this.isFollowing = response.data.Following;
    this.setButtonType(this.isFollowing);
  }

  setButtonType(isFollowing: boolean) {
    if (isFollowing) {
      this.icon = faUserMinus;
    } else if (!isFollowing) {
      this.icon = faUserPlus;
    }
  }

  click() {
    if (!this.isFollowing) this.follow();
    else if (this.isFollowing) this.unFollow();
  }

  async follow() {
    this.apiClient.followUser(this.user.Id);
    this.isFollowing = true;
    this.setButtonType(this.isFollowing);
    this.user.Followers++;
  }

  async unFollow() {
    this.apiClient.unFollowUser(this.user.Id);
    this.isFollowing = false;
    this.setButtonType(this.isFollowing);
    this.user.Followers--;
  }
}
