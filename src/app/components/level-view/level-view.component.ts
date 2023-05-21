import { Component, Input } from '@angular/core';
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import { formatDistance, formatDistanceStrict } from 'date-fns';
import { ApiUrl } from 'src/app/config';
import { ApiClientService } from 'src/app/services/api-client.service';
import { BriefLevel } from 'src/app/types/api/levels';

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
  modificationDate = '';

  ngOnInit() {
    if (this.level) {
      this.thumbnailUrl = ApiUrl + 'levels/id/' + this.level.Id + '/thumbnail';
      this.modificationDate = formatDistanceStrict(
        new Date(this.level.CreationDate),
        new Date(),
        {
          addSuffix: true,
        }
      );
    }
  }
}
