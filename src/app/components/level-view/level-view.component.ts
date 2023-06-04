import { Component, Input } from '@angular/core';
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceStrict } from 'date-fns';
import { ApiClientService } from 'src/app/services/api-client.service';
import { BriefLevel } from 'src/app/types/api/levels';
import { environment } from 'src/environments/environment';

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
