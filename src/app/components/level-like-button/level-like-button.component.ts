import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';
import { FullLevel } from 'src/app/types/api/levels';

@Component({
  selector: 'app-level-like-button',
  templateUrl: './level-like-button.component.html',
  styleUrls: ['./level-like-button.component.scss'],
})
export class LevelLikeButtonComponent {
  constructor(private apiClient: ApiClientService) {}

  @Input() isLiked!: boolean;
  icon: IconProp = faHeart;
  @Input() level!: FullLevel;

  async ngOnChanges() {
    this.setButtonType(this.isLiked);
  }

  async onClick() {
    if (!this.isLiked) {
      this.apiClient.likeLevel(this.level.Id);
      this.isLiked = true;
      this.setButtonType(this.isLiked);
      this.level.Likes++;
    } else if (this.isLiked) {
      this.apiClient.unLikeLevel(this.level.Id);
      this.isLiked = false;
      this.setButtonType(this.isLiked);
      this.level.Likes--;
    }
  }

  setButtonType(isLiked: boolean) {
    if (isLiked) {
      this.icon = faHeartBroken;
    } else if (!isLiked) {
      this.icon = faHeart;
    }
  }
}
