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

      this.fetchButtonType();
    });
  }

  async onClick() {
    console.log('Botch As');
    if (this.buttonType == ButtonType.Like) {
      this.apiClient.likeLevel(this.level.Id);
      this.setButtonType(true);
      this.level.Likes++;
    } else if (this.buttonType == ButtonType.UnLike) {
      this.apiClient.unLikeLevel(this.level.Id);
      this.setButtonType(false);
      this.level.Likes--;
    }
  }

  fetchButtonType() {
    this.apiClient.getLevelRelation(this.level.Id).then((response) => {
      this.setButtonType(response.data.Liked);
    });
  }

  setButtonType(isLiked: boolean) {
    if (isLiked) {
      this.icon = faHeartBroken;
      this.buttonType = ButtonType.UnLike;
    } else {
      this.icon = faHeart;
      this.buttonType = ButtonType.Like;
    }
  }
}

enum ButtonType {
  Like,
  UnLike,
  Settings,
}
