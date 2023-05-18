import { Component, Input } from '@angular/core';
import { SidebarButton } from 'src/app/types/sidebar-button';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() buttons!: SidebarButton[];
  @Input() index!: number | null;
}
