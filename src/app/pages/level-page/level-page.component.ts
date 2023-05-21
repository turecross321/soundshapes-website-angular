import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faPlay, faHeart, IconPack } from '@fortawesome/free-solid-svg-icons';
import { ApiUrl } from 'src/app/config';
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

@Component({
  selector: 'app-level-page',
  templateUrl: './level-page.component.html',
  styleUrls: ['./level-page.component.scss'],
})
export class LevelPageComponent {
  level: FullLevel | undefined = undefined;

  thumbnailUrl = '';
  difficulty = 0;
  creationAndModification = '';
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
      this.creationAndModification =
        'Published ' +
        formatDistanceStrict(new Date(this.level.CreationDate), new Date(), {
          addSuffix: true,
        });

      if (this.level.ModificationDate != this.level.CreationDate) {
        this.creationAndModification +=
          ', modified ' +
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
          ApiUrl + 'levels/id/' + this.level.Id + '/thumbnail';
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
