import { Component, Input } from '@angular/core';
import {
  faBookSkull,
  faFill,
  faSkull,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-difficulty-viewer',
  templateUrl: './difficulty-viewer.component.html',
  styleUrls: ['./difficulty-viewer.component.scss'],
})
export class DifficultyViewerComponent {
  @Input() difficulty!: number;

  skullIcon = faSkull;

  getRange() {
    return Array(Math.floor(this.difficulty)).fill(null);
  }
}
