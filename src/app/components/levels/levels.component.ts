import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faAnglesDown,
  faAnglesUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faCalendar,
  faCaretDown,
  faChevronDown,
  faChevronUp,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';
import { LevelOrder, LevelsWrapper } from 'src/app/types/api/levels';
import { DropDownButton } from 'src/app/types/dropdown-button';

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
  searchQuery!: string;

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
      this.searchQuery = params['search'];

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
    const levelPageSize = 8;

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

  orderTypes: DropDownButton[] = [
    {
      Label: 'Creation Date',
      Icon: faCalendar,
    },
    {
      Label: 'Modification Date',
      Icon: faCalendar,
    },
    {
      Label: 'Total Plays',
      Icon: faCalendar,
    },
    {
      Label: 'Unique Plays',
      Icon: faCalendar,
    },
    {
      Label: 'Likes',
      Icon: faCalendar,
    },
    {
      Label: 'File Size',
      Icon: faCalendar,
    },
    {
      Label: 'Difficulty',
      Icon: faCalendar,
    },
    {
      Label: 'Relevance',
      Icon: faCalendar,
    },
    {
      Label: 'Random',
      Icon: faCalendar,
    },
    {
      Label: 'Deaths',
      Icon: faCalendar,
    },
    {
      Label: 'Total Play Time',
      Icon: faCalendar,
    },
    {
      Label: 'Average Play Time',
      Icon: faCalendar,
    },
  ];
}
