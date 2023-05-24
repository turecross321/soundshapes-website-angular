import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectableButton } from 'src/app/types/selectable-button';

@Component({
  selector: 'app-selectable-button',
  templateUrl: './selectable-button.component.html',
  styleUrls: ['./selectable-button.component.scss'],
})
export class DropdownButtonComponent {
  @Input() index!: number;
  @Input() button!: SelectableButton;
  @Input() selected!: boolean;

  @Output() numberChanged: EventEmitter<number> = new EventEmitter<number>();

  click() {
    this.numberChanged.next(this.index);
  }
}
