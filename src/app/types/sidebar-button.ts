import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface SidebarButton {
  Label: string;
  Icon: IconProp;
  Count: number;
  Path: string;
}
