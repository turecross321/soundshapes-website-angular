import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faPlay, faHeart, faBell } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';
import { FullLevel, LevelRelation } from 'src/app/types/api/levels';
import { formatDistanceStrict } from 'date-fns';

@Component({
  selector: 'app-level-page',
  templateUrl: './level-page.component.html',
  styleUrls: ['./level-page.component.scss'],
})
export class LevelPageComponent {
  loading: boolean = true;
  level: FullLevel | undefined = undefined;
  relation: LevelRelation | undefined = undefined;
  loggedIn: boolean = false;

  thumbnailUrl = '';
  difficulty = 0;
  creation: string = '';
  modification: string | null = null;

  playIcon = faPlay;
  likeIcon = faHeart;
  queueIcon = faBell;

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
        this.creation += ',';
        this.modification =
          'last modified ' +
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

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      let levelId = params.get('levelId') as string;
      this.thumbnailUrl = this.apiClient.getLevelThumbnailUrl(levelId);

      const response = await this.apiClient.getLevelWithId(levelId);
      if (response.status != 200) this.router.navigate(['/404']);

      this.level = response.data;
      if (!this.level) return;

      this.setDate();

      this.apiClient.isLoggedIn$.subscribe(async (loggedIn) => {
        this.loggedIn = loggedIn;
        if (loggedIn) {
          const response = await this.apiClient.getLevelRelation(levelId);
          this.relation = response.data;
        }
      });

      this.difficulty = this.level.Difficulty;

      this.loading = false;
    });
  }
}
