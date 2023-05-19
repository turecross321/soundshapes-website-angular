import { Component, Input } from '@angular/core';
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

  ngOnInit() {
    this.thumbnailUrl = ApiUrl + 'levels/id/' + this.level.Id + '/thumbnail';
  }
}
