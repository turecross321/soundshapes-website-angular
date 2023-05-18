import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown, faPoo } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { DropDownButton } from 'src/app/types/dropdown-button';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  _label = 'NOT SET';
  _icon = faCaretDown;
  _buttons: DropDownButton[] = [
    {
      Label: 'NOT SET',
      Icon: faPoo,
    },
  ];

  @Output() selectedOption: number = 0;
  onOptionChanged(newOption: number) {
    this.selectedOption = newOption;
    this.toggleDropdown();
  }

  @Input()
  set label(param: string) {
    this._label = param;
  }

  @Input()
  set buttons(param: DropDownButton[]) {
    this._buttons = param;
  }

  public isMenuOpened: boolean = false;

  toggleDropdown() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  selectButton(index: number) {
    console.log(index);
  }

  clickedOutside(): void {
    this.isMenuOpened = false;
  }
}
