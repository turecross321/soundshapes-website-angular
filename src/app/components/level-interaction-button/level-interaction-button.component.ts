import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  IconPack,
  faGear,
  faHeart,
  faHeartBroken,
  faHeartCircleMinus,
  faHeartCirclePlus,
  faHeartCrack,
  faHeartbeat,
  faPoo,
  faUpRightAndDownLeftFromCenter,
} from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';
import { FullLevel } from 'src/app/types/api/levels';

@Component({
  selector: 'app-level-interaction-button',
  templateUrl: './level-interaction-button.component.html',
  styleUrls: ['./level-interaction-button.component.scss'],
})
export class LevelInteractionButtonComponent {
  constructor(private apiClient: ApiClientService) {}

  showButton: boolean = false;
  icon!: IconProp;
  buttonType!: ButtonType;
  @Input() level!: FullLevel;

  async ngOnInit() {
    this.apiClient.isLoggedIn$.subscribe((loggedIn) => {
      if (!loggedIn) {
        this.showButton = false;
        return;
      }

      this.showButton = true;

      this.setButtonType();
    });
  }

  async onClick() {
    if (this.buttonType == ButtonType.Like) {
      await this.apiClient.likeLevel(this.level.Id);
      this.setButtonType();
      this.level.Likes++;
    }
    if (this.buttonType == ButtonType.UnLike) {
      await this.apiClient.unLikeLevel(this.level.Id);
      this.setButtonType();
      this.level.Likes--;
    }
  }

  setButtonType() {
    this.apiClient.session$.subscribe((session) => {
      this.apiClient.checkLevelLikeStatus(this.level.Id).then((response) => {
        const isLiked = response.data.IsLiked;
        if (isLiked) {
          this.icon = faHeartBroken;
          this.buttonType = ButtonType.UnLike;
        } else {
          this.icon = faHeart;
          this.buttonType = ButtonType.Like;
        }
      });
    });
  }
}

enum ButtonType {
  Like,
  UnLike,
  Settings,
}
