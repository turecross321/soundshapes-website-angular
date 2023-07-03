import { Component, Input } from '@angular/core';
import { formatDistanceStrict } from 'date-fns';

@Component({
  selector: 'app-time-text',
  templateUrl: './time-text.component.html',
  styleUrls: ['./time-text.component.scss'],
})
export class TimeTextComponent {
  @Input() prefix: string = '';
  @Input() suffix: string = '';
  @Input() unix!: number;
  date: Date | undefined;
  formattedDate!: string;

  ngOnInit() {
    this.date = new Date(this.unix * 1000);

    this.formattedDate =
      this.prefix +
      formatDistanceStrict(this.date, new Date(), {
        addSuffix: true,
      }) +
      this.suffix;
  }
}
