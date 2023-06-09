import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  Router,
} from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faAnglesDown,
  faAnglesUp,
  faArrowLeft,
  faArrowRight,
  faArrowsUpDown,
  faBell,
  faBookSkull,
  faCalendar,
  faChartLine,
  faClock,
  faFile,
  faFilter,
  faFire,
  faHeart,
  faHeartPulse,
  faList,
  faPenNib,
  faPlay,
  faSearch,
  faShuffle,
  faSitemap,
  faSkull,
  faTrophy,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/api/api-client.service';
import { LevelOrder, LevelsWrapper } from 'src/app/api/types/levels';
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
  filterIcon: IconProp = faFilter;

  searchId: string = 'search';
  loading: boolean = true;

  platformId!: Object;
  constructor(
    private apiClient: ApiClientService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
  }

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
    if (this.descending) {
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

      this.loadLevels(this.pageIndex, this.orderType, this.descending, params);
    });
  }

  async loadLevels(
    page: number,
    orderBy: number,
    descending: boolean,
    params: Params
  ) {
    this.levelsWrapper = {
      Levels: [],
      Count: 0,
    };
    const levelPageSize = 32;

    this.levelsWrapper.Levels = [];

    this.loading = true;

    let response = await this.apiClient.getLevels(
      levelPageSize * page,
      levelPageSize,
      Object.values(LevelOrder)[orderBy],
      descending,
      params
    );
    this.loading = false;

    this.levelsWrapper = response;
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
