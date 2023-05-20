import { Component, Input } from '@angular/core';
import { FullUser } from 'src/app/types/api/users';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss'],
})
export class UserStatisticsComponent {
  @Input() user!: FullUser | undefined;

  creationDate = '';
  playTime = '';
  playedLevels = '';
  totalDeaths = '';

  ngOnInit() {
    if (this.user) {
      this.creationDate = new Date(this.user.CreationDate).toLocaleDateString();
      this.playTime = Math.floor(this.user.TotalPlayTime / 100 / 60 / 60) + 'h'; // Milliseconds to hours
      this.playedLevels = this.user.PlayedLevelsCount.toString();
      this.totalDeaths = this.user.TotalDeaths.toString();
    }
  }
}
