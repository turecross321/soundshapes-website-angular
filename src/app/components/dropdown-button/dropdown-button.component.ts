import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropDownButton } from 'src/app/types/dropdown-button';

@Component({
  selector: 'app-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss'],
})
export class DropdownButtonComponent {
  @Input() index!: number;
  @Input() button!: DropDownButton;
  @Input() selected!: boolean;

  @Output() numberChanged: EventEmitter<number> = new EventEmitter<number>();

  click() {
    this.numberChanged.next(this.index);
  }
}
