import { Component, Input } from '@angular/core';
import { formatDuration, intervalToDuration } from 'date-fns';
import { FullLevel, Scale } from 'src/app/types/api/levels';

@Component({
  selector: 'app-level-statistics',
  templateUrl: './level-statistics.component.html',
  styleUrls: ['./level-statistics.component.scss'],
})
export class LevelStatisticsComponent {
  @Input() level!: FullLevel | undefined;

  totalPlayTime = '';
  averagePlayTime = '';
  totalPlays = '';
  totalDeaths = '';
  scaleName = '';

  ngOnInit() {
    if (this.level) {
      const totalPlayTime: Duration = intervalToDuration({
        start: 0,
        end: this.level.TotalPlayTime,
      });

      if (this.level.TotalPlays != 0) {
        const averagePlayTime: Duration = intervalToDuration({
          start: 0,
          end: this.level.TotalPlayTime / this.level.TotalPlays,
        });
        this.averagePlayTime = formatDuration(averagePlayTime, {
          format: ['hours', 'minutes', 'seconds'],
          delimiter: ', ',
        })
          .split(',') // i'm so sorry
          .slice(0, 2)
          .join();
      }

      this.totalPlayTime = formatDuration(totalPlayTime, {
        format: ['hours', 'minutes', 'seconds'],
        delimiter: ', ',
      })
        .split(',')
        .slice(0, 2)
        .join();

      if (this.totalPlayTime == '') this.totalPlayTime = '0 seconds';
      if (this.averagePlayTime == '') this.averagePlayTime = '0 seconds';

      this.totalPlays = this.level.TotalPlays.toString();
      this.totalDeaths = this.level.TotalDeaths.toString();
      this.scaleName = Scale[this.level.ScaleIndex];
    }
  }
}
