import { Component, Input } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { count } from 'rxjs';
import { ApiClientService } from 'src/app/services/api-client.service';
import {
  BriefLevel,
  LevelOrder,
  LevelsWrapper,
} from 'src/app/types/api/levels';
import { DropDownButton } from 'src/app/types/dropdown-button';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss'],
})
export class LevelsComponent {
  constructor(private apiClient: ApiClientService) {}

  onChangedOrder(param: number) {
    this.orderType = param;
    this.loadLevels();
  }

  orderType = 0;

  buttons: DropDownButton[] = [
    {
      Label: 'Creation Date',
      Icon: faCalendar,
    },
    {
      Label: 'Modification Date',
      Icon: faCalendar,
    },
    {
      Label: 'Total Plays',
      Icon: faCalendar,
    },
    {
      Label: 'Unique Plays',
      Icon: faCalendar,
    },
    {
      Label: 'Likes',
      Icon: faCalendar,
    },
    {
      Label: 'File Size',
      Icon: faCalendar,
    },
    {
      Label: 'Difficulty',
      Icon: faCalendar,
    },
    {
      Label: 'Relevance',
      Icon: faCalendar,
    },
    {
      Label: 'Random',
      Icon: faCalendar,
    },
    {
      Label: 'Deaths',
      Icon: faCalendar,
    },
    {
      Label: 'Total Play Time',
      Icon: faCalendar,
    },
    {
      Label: 'Average Play Time',
      Icon: faCalendar,
    },
  ];

  levelsWrapper: LevelsWrapper = {
    Levels: [],
    Count: 0,
  };

  ngOnInit() {
    this.loadLevels();
  }

  async loadLevels() {
    let response = await this.apiClient.getLevels(
      0,
      9,
      Object.values(LevelOrder)[this.orderType]
    );

    this.levelsWrapper = response.data;
  }
}
