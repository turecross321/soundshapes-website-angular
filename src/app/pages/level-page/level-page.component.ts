import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBell, faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/api/api-client.service';
import { FullLevel, LevelRelation } from 'src/app/api/types/levels';
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

  creationDate: Date | undefined;
  modificationDate: Date | undefined;
  creationString: string = '';
  modificationString: string | null = null;

  playIcon = faPlay;
  likeIcon = faHeart;
  queueIcon = faBell;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: ApiClientService
  ) {}

  setDate() {
    if (!this.level) return;

    this.creationDate = new Date(this.level.CreationDate * 1000);
    this.creationString =
      'Published ' +
      formatDistanceStrict(this.creationDate, new Date(), {
        addSuffix: true,
      });

    this.modificationDate = new Date(this.level.ModificationDate * 1000);

    if (this.creationDate != this.modificationDate) {
      this.creationString += ',';
      this.modificationString =
        'last modified ' +
        formatDistanceStrict(this.modificationDate, new Date(), {
          addSuffix: true,
        });
    }
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      let levelId = params.get('levelId') as string;
      this.thumbnailUrl = this.apiClient.getLevelThumbnailUrl(levelId);

      this.level = await this.apiClient.getLevelWithId(levelId);
      if (!this.level) {
        await this.router.navigate(['/404']);
        return;
      }

      this.setDate();

      this.apiClient.isLoggedIn$.subscribe(async (loggedIn) => {
        this.loggedIn = loggedIn;
        if (loggedIn) {
          this.relation = await this.apiClient.getLevelRelation(levelId);
        }
      });

      this.difficulty = this.level.Difficulty;

      this.loading = false;
    });
  }
}
