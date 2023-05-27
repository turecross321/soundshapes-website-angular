import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faPlay, faHeart } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';
import { FullLevel } from 'src/app/types/api/levels';
import {
  format,
  formatDistance,
  formatDistanceStrict,
  formatRelative,
  subDays,
} from 'date-fns';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-level-page',
  templateUrl: './level-page.component.html',
  styleUrls: ['./level-page.component.scss'],
})
export class LevelPageComponent {
  level: FullLevel | undefined = undefined;

  thumbnailUrl = '';
  difficulty = 0;
  creation: string = '';
  modification: string | null = null;
  interactionIcon!: IconProp;

  playIcon = faPlay;
  likeIcon = faHeart;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: ApiClientService
  ) {}

  setDate() {
    if (this.level) {
      this.creation =
        'Published ' +
        formatDistanceStrict(new Date(this.level.CreationDate), new Date(), {
          addSuffix: true,
        });

      if (this.level.ModificationDate != this.level.CreationDate) {
        this.modification =
          ', last modified ' +
          formatDistanceStrict(
            new Date(this.level.ModificationDate),
            new Date(),
            {
              addSuffix: true,
            }
          );
      }
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let levelId = params.get('levelId') as string;

      this.apiClient.getLevelWithId(levelId).then((response) => {
        if (response.status != 200) this.router.navigate(['/404']);

        this.level = response.data;
        if (!this.level) return;

        this.thumbnailUrl =
          environment.apiBaseUrl + 'levels/id/' + this.level.Id + '/thumbnail';
        this.difficulty = this.level.Difficulty;

        this.setDate();

        this.apiClient.isLoggedIn$.subscribe((loggedIn) => {
          if (!loggedIn) return;

          this.interactionIcon = faHeart;
        });
      });
    });
  }
}
