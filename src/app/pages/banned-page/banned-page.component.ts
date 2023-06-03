import { Component, Input } from '@angular/core';
import { Session } from 'src/app/types/api/account';
import { Punishment } from 'src/app/types/api/punishments';

@Component({
  selector: 'app-banned-page',
  templateUrl: './banned-page.component.html',
  styleUrls: ['./banned-page.component.scss'],
})
export class BannedPageComponent {
  @Input() session!: Session;
  @Input() punishments!: Punishment[];
}
