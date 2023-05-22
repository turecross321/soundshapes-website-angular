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
  @Input() icon: IconProp = faPoo; // DON'T WORRY ABOUT IT JVYDEN IT WAS DEFINITELY A COINCIDENCE
  @Input() name: string = 'NAME NOT SET';
  @Input() type: InputType = InputType.Text;
  @Input() id!: string;
  @Input() readonly: boolean = false;
  @Input() value: string = '';

  typeString!: string;
  errorMessage: string | null = null;

  field!: HTMLInputElement;

  ngOnInit() {
    switch (this.type) {
      case InputType.Email:
        this.typeString = 'email';
        break;
      case InputType.Password:
        this.typeString = 'password';
        break;
      case InputType.PasswordCode:
      case InputType.Text:
      case InputType.EmailCode:
        this.typeString = 'text';
        break;
    }
  }

  validateInput() {
    this.field = <HTMLInputElement>document.getElementById(this.id);

    if (this.type == InputType.Email) {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(this.field.value)) {
        this.errorMessage = 'Invalid Email Address.';
      } else {
        this.errorMessage = null;
      }
    } else if (this.type == InputType.EmailCode) {
      const emailCodeRegex = /^\d{8}$/;
      if (!emailCodeRegex.test(this.field.value)) {
        this.errorMessage = 'Invalid Email Code.';
      }
    } else if (this.type == InputType.PasswordCode) {
      const passwordCodeRegex = /^\A-Z{8}$/;
      if (!passwordCodeRegex.test(this.field.value)) {
        this.errorMessage = 'Invalid Password Code.';
      }
    }
  }

  resolveInputError() {
    this.field = <HTMLInputElement>document.getElementById(this.id);

    if (this.type == InputType.Email) {
      const emailRegex = /\S+@\S+\.\S+/;
      if (emailRegex.test(this.field.value)) {
        this.errorMessage = null;
      }
    } else if (this.type == InputType.EmailCode) {
      const emailCodeRegex = /^\d{8}$/;
      if (emailCodeRegex.test(this.field.value)) {
        this.errorMessage = null;
      }
    }
  }
}
