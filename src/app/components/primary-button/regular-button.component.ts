import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
})
export class PrimaryButtonComponent {
  _label: string = 'NOT SET';

  @Input()
  set label(param: string) {
    this._label = param;
  }
}
