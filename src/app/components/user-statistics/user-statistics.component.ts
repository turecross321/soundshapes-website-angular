import { Component, Input } from '@angular/core';
import { formatDuration, intervalToDuration } from 'date-fns';
import { FullUser } from 'src/app/types/api/users';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss'],
})
export class UserStatisticsComponent {
  @Input() user!: FullUser | undefined;

  creationDate = '';
  totalPlayTime = '';
  playedLevels = '';
  totalDeaths = '';

  ngOnInit() {
    if (this.user) {
      const totalPlayTime: Duration = intervalToDuration({
        start: 0,
        end: this.user.TotalPlayTime,
      });

      this.creationDate = new Date(this.user.CreationDate).toLocaleDateString();
      this.totalPlayTime = formatDuration(totalPlayTime, {
        format: ['hours', 'minutes', 'seconds'],
        delimiter: ', ',
      })
        .split(',')
        .slice(0, 2)
        .join();

      if (this.totalPlayTime == '') this.totalPlayTime = '0 seconds';
      this.playedLevels = this.user.PlayedLevels.toString();
      this.totalDeaths = this.user.TotalDeaths.toString();
    }
  }
}
