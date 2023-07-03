import { Component, Input } from '@angular/core';
import { Punishment, PunishmentType } from 'src/app/api/types/punishments';

@Component({
  selector: 'app-punishment-view',
  templateUrl: './punishment-view.component.html',
  styleUrls: ['./punishment-view.component.scss'],
})
export class PunishmentViewComponent {
  @Input() punishment!: Punishment;

  punishmentTypeName!: string;

  ngOnInit() {
    this.punishmentTypeName = PunishmentType[this.punishment.PunishmentType];
  }
}
