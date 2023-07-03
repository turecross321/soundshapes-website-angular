import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { IpAddress } from 'src/app/api/types/ip';

@Component({
  selector: 'app-ip-view',
  templateUrl: './ip-view.component.html',
  styleUrls: ['./ip-view.component.scss'],
})
export class IpViewComponent {
  @Input() ip!: IpAddress;
  oneTimeUseIcon = faClock;

  @Output()
  authorized = new EventEmitter<string>();

  @Output()
  authorizedOnce = new EventEmitter<string>();

  @Output()
  removed = new EventEmitter<string>();

  authorize() {
    this.authorized.next(this.ip.IpAddress);
  }
  authorizeOnce() {
    this.authorizedOnce.next(this.ip.IpAddress);
  }
  remove() {
    this.removed.next(this.ip.IpAddress);
  }
}
