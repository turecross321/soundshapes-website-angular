import { Component, Input } from '@angular/core';
import { SidebarButton } from 'src/app/types/sidebar-button';

@Component({
  selector: 'app-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.scss'],
})
export class SidebarButtonComponent {
  @Input() button!: SidebarButton;
  @Input() selected!: boolean;
}
