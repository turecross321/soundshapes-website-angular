import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/api/api-client.service';
import { FullLevel } from 'src/app/api/types/levels';

@Component({
  selector: 'app-level-queue-button',
  templateUrl: './level-queue-button.component.html',
  styleUrls: ['./level-queue-button.component.scss'],
})
export class LevelQueueButtonComponent {
  constructor(private apiClient: ApiClientService) {}

  @Input() isQueued!: boolean;
  icon: IconProp = faBell;
  @Input() level!: FullLevel;

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

  ngOnInit() {
    this.setButtonType(this.isQueued);
  }

  setButtonType(isQueued: boolean) {
    if (isQueued) {
      this.icon = faBellSlash;
    } else if (!isQueued) {
      this.icon = faBell;
    }
  }
}
