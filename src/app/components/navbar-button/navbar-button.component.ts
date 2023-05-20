import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NavbarButton } from 'src/app/types/navbar-button';

@Component({
  selector: 'app-navbar-button',
  templateUrl: './navbar-button.component.html',
  styleUrls: ['./navbar-button.component.scss'],
})
export class NavbarButtonComponent {
  @Input() navbarButton!: NavbarButton;
}
