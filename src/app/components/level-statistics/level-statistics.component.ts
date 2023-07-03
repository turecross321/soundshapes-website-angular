import { Component, Input } from '@angular/core';
import { formatDuration, intervalToDuration } from 'date-fns';
import { FullLevel, Scale } from 'src/app/api/types/levels';

@Component({
  selector: 'app-level-statistics',
  templateUrl: './level-statistics.component.html',
  styleUrls: ['./level-statistics.component.scss'],
})
export class LevelStatisticsComponent {
  @Input() level!: FullLevel | undefined;

  totalPlayTime = '';
  scaleName = '';

  ngOnChanges() {
    if (this.level) {
      const totalPlayTime: Duration = intervalToDuration({
        start: 0,
        end: this.level.TotalPlayTime,
      });

      this.totalPlayTime = formatDuration(totalPlayTime, {
        format: ['hours', 'minutes', 'seconds'],
        delimiter: ', ',
      })
        .split(',')
        .slice(0, 2)
        .join();

      if (this.totalPlayTime == '') this.totalPlayTime = '0 seconds';
      this.scaleName = Scale[this.level.Analysis.ScaleIndex];
    }
  }
}
