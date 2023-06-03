import { Component, Input } from '@angular/core';
import { formatDistanceStrict } from 'date-fns';

@Component({
  selector: 'app-time-text',
  templateUrl: './time-text.component.html',
  styleUrls: ['./time-text.component.scss'],
})
export class TimeTextComponent {
  @Input() date!: Date;
  formattedDate!: string;

  ngOnInit() {
    this.formattedDate = formatDistanceStrict(new Date(this.date), new Date(), {
      addSuffix: true,
    });
  }
}
