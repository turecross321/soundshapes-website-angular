import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCross, faPoo } from '@fortawesome/free-solid-svg-icons';
import { InputType } from 'src/app/types/input-type';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent {
  _icon: IconProp = faPoo; // DON'T WORRY ABOUT IT JVYDEN IT WAS DEFINITELY A COINCIDENCE
  _name: string = 'NAME NOT SET';
  _type: InputType = InputType.Text;
  _id: string | undefined = undefined;
  _readonly: boolean = false;
  _value: string = '';

  @Input()
  set icon(param: IconProp) {
    this._icon = param;
  }

  @Input()
  set name(param: string) {
    this._name = param;
  }

  @Input()
  set type(param: InputType) {
    this._type = param;
  }

  @Input()
  set id(param: string) {
    this._id = param;
  }

  @Input()
  set readonly(param: boolean) {
    this._readonly = param;
  }

  @Input()
  set value(param: string | undefined) {
    if (param === undefined) param = '';
    this._value = param;
  }
}
