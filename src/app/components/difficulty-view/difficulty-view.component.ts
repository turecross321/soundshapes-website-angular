import { Component, Input } from '@angular/core';
import { faSkull } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-difficulty-view',
  templateUrl: './difficulty-view.component.html',
  styleUrls: ['./difficulty-view.component.scss'],
})
export class DifficultyViewerComponent {
  @Input() difficulty!: number;

  skullIcon = faSkull;

  getRange() {
    return Array(Math.floor(this.difficulty)).fill(null);
  }
}
