import { Component, Input } from '@angular/core';
import { BriefLevel, LevelsWrapper } from '../types/api/levels';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Params } from '@angular/router';

@Component({
  selector: 'app-level-carousel',
  templateUrl: './level-carousel.component.html',
  styleUrls: ['./level-carousel.component.scss'],
})
export class LevelCarouselComponent {
  @Input() title!: string;
  @Input() levelsWrapper!: LevelsWrapper;
  @Input() params!: Params;

  moreIcon = faArrowRight;
}
