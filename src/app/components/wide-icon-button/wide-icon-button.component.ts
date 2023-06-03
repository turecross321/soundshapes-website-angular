import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPoo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-wide-icon-button',
  templateUrl: './wide-icon-button.component.html',
  styleUrls: ['./wide-icon-button.component.scss'],
})
export class WideIconButtonComponent {
  @Input() icon: IconProp = faPoo;
}
