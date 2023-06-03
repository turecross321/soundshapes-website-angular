import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-removal-warning',
  templateUrl: './removal-warning.component.html',
  styleUrls: ['./removal-warning.component.scss'],
})
export class RemovalWarningComponent {
  @Output() readWarning: EventEmitter<void> = new EventEmitter<void>();
  click() {
    this.readWarning.next();
  }
}
