import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSquareBehance } from '@fortawesome/free-brands-svg-icons';
import { faRectangleTimes } from '@fortawesome/free-regular-svg-icons';
import {
  faAnglesDown,
  faAnglesUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowsUpDown,
  faBell,
  faBookSkull,
  faBox,
  faBoxesStacked,
  faCalendar,
  faCaretDown,
  faChartLine,
  faChevronDown,
  faChevronUp,
  faClock,
  faCubesStacked,
  faFile,
  faFire,
  faHeart,
  faHeartPulse,
  faList,
  faPenNib,
  faPhotoFilm,
  faPlay,
  faRectangleAd,
  faRectangleList,
  faSearch,
  faShuffle,
  faSitemap,
  faSkull,
  faSpaghettiMonsterFlying,
  faSquare,
  faTimesRectangle,
  faTrophy,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';
import { LevelOrder, LevelsWrapper } from 'src/app/types/api/levels';
import { SelectableButton } from 'src/app/types/selectable-button';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss'],
})
export class LevelsComponent {
  orderType!: number;
  pageIndex!: number;
  totalPages!: number;
  descending!: boolean;
  descendingIcon!: IconProp;
  searchQuery: string = '';

  searchId: string = 'search';
  loading: boolean = true;

  constructor(
    private apiClient: ApiClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onChangedOrder(param: number) {
    const queryParams: NavigationExtras = {
      queryParams: { order: param, page: 0 },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    };

    this.router.navigate([], queryParams);
  }

  onToggledDescending() {
    this.descending = !this.descending;

    const queryParams: NavigationExtras = {
      queryParams: { descending: this.descending, page: 0 },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    };

    this.router.navigate([], queryParams);
  }

  goToPage(param: number) {
    const queryParams: NavigationExtras = {
      queryParams: { page: param },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    };

    this.router.navigate([], queryParams);
  }

  setDescendingIcon() {
    if (this.descending == true) {
      this.descendingIcon = faAnglesDown;
    } else this.descendingIcon = faAnglesUp;
  }

  onSearch() {
    const searchQuery: string = (<HTMLInputElement>(
      document.getElementById(this.searchId)
    )).value;

    if (searchQuery == this.searchQuery) return;

    const queryParams: NavigationExtras = {
      queryParams: { search: searchQuery, page: 0 },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    };

    this.router.navigate([], queryParams);
  }

  levelsWrapper: LevelsWrapper | undefined;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.orderType = (params['order'] as number | undefined) ?? 0;
      if (this.orderType > this.orderTypes.length || this.orderType < 0)
        this.router.navigate(['/levels']);
      this.pageIndex = (params['page'] as number | undefined) ?? 0;
      this.descending = (params['descending'] ?? 'true') === 'true';
      this.setDescendingIcon();
      const searchQuery = params['search'];
      if (searchQuery) this.searchQuery = searchQuery;

      this.loadLevels(
        this.pageIndex,
        this.orderType,
        this.descending,
        this.searchQuery
      );
    });
  }

  async loadLevels(
    page: number,
    orderBy: number,
    descending: boolean,
    searchQuery?: string
  ) {
    const levelPageSize = 32;

    if (this.levelsWrapper != undefined) this.levelsWrapper.Levels = [];

    this.loading = true;

    let response = await this.apiClient.getLevels(
      levelPageSize * page,
      levelPageSize,
      Object.values(LevelOrder)[orderBy],
      descending,
      searchQuery
    );
    this.loading = false;

    this.levelsWrapper = response.data;
    this.totalPages = Math.ceil(
      (this.levelsWrapper?.Count ?? 0) / levelPageSize
    );
  }

  searchIcon = faSearch;
  arrowLeft = faArrowLeft;
  arrowRight = faArrowRight;

  orderTypes: SelectableButton[] = [
    {
      Label: 'Creation Date',
      Icon: faCalendar,
    },
    {
      Label: 'Modification Date',
      Icon: faPenNib,
    },
    {
      Label: 'Total Plays',
      Icon: faPlay,
    },
    {
      Label: 'Unique Plays',
      Icon: faUsers,
    },
    {
      Label: 'Total Completions',
      Icon: faTrophy,
    },
    {
      Label: 'Unique Completions',
      Icon: faTrophy,
    },
    {
      Label: 'Likes',
      Icon: faHeart,
    },
    {
      Label: 'Queues',
      Icon: faBell,
    },
    {
      Label: 'File Size',
      Icon: faFile,
    },
    {
      Label: 'Difficulty',
      Icon: faSkull,
    },
    {
      Label: 'Relevance',
      Icon: faFire,
    },
    {
      Label: 'Random',
      Icon: faShuffle,
    },
    {
      Label: 'Total Deaths',
      Icon: faBookSkull,
    },
    {
      Label: 'Total Play Time',
      Icon: faClock,
    },
    {
      Label: 'Average Play Time',
      Icon: faChartLine,
    },
    {
      Label: 'Total Screens',
      Icon: faSitemap,
    },
    {
      Label: 'Total Entities',
      Icon: faList,
    },
    {
      Label: 'BPM',
      Icon: faHeartPulse,
    },
    {
      Label: 'Transpose Value',
      Icon: faArrowsUpDown,
    },
  ];
}
