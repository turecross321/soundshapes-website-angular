import { Component, Input } from '@angular/core';
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceStrict } from 'date-fns';
import { BriefLevel } from 'src/app/types/api/levels';
import { environment } from 'src/environments/environment.development';

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

  ngOnInit() {
    if (this.level) {
      this.thumbnailUrl =
        environment.apiBaseUrl + 'levels/id/' + this.level.Id + '/thumbnail';
      this.creationDate = formatDistanceStrict(
        new Date(this.level.CreationDate),
        new Date(),
        {
          addSuffix: true,
        }
      );
    }
  }
}
