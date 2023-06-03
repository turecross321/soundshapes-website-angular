import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBell,
  faBellConcierge,
  faBellSlash,
} from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';
import { FullLevel } from 'src/app/types/api/levels';

@Component({
  selector: 'app-level-queue-button',
  templateUrl: './level-queue-button.component.html',
  styleUrls: ['./level-queue-button.component.scss'],
})
export class LevelQueueButtonComponent {
  constructor(private apiClient: ApiClientService) {}

  isQueued!: boolean;
  icon: IconProp = faBell;
  @Input() level!: FullLevel;

  async ngOnInit() {
    this.fetchButtonType();
  }

  async onClick() {
    if (!this.isQueued) {
      this.apiClient.queueLevel(this.level.Id);
      this.isQueued = true;
      this.setButtonType(this.isQueued);
      this.level.Queues++;
    } else if (this.isQueued) {
      this.apiClient.unQueueLevel(this.level.Id);
      this.isQueued = false;
      this.setButtonType(this.isQueued);
      this.level.Queues--;
    }
  }

  async fetchButtonType() {
    const response = await this.apiClient.getLevelRelation(this.level.Id);
    this.setButtonType(response.data.Liked);
  }

  setButtonType(isLiked: boolean) {
    if (isLiked) {
      this.icon = faBellSlash;
    } else if (!isLiked) {
      this.icon = faBell;
    }
  }
}
