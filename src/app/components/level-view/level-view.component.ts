import { Component, Input } from '@angular/core';
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/api/api-client.service';
import { BriefLevel } from 'src/app/api/types/levels';

@Component({
  selector: 'app-level-view',
  templateUrl: './level-view.component.html',
  styleUrls: ['./level-view.component.scss'],
})
export class LevelViewComponent {
  @Input() level!: BriefLevel;
  thumbnailUrl = '';

  playIcon = faPlay;
  likeIcon = faHeart;

  hovered: boolean = false;
  creationDate = '';

  constructor(private apiClient: ApiClientService) {}

  ngOnInit() {
    if (this.level) {
      this.thumbnailUrl = this.apiClient.getLevelThumbnailUrl(this.level.Id);
    }
  }
}
