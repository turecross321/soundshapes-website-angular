import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  @Input()
  StepsCount!: number;

  @Input()
  StepIndex!: number;

  getRange(): any[] {
    return Array(this.StepsCount);
  }
}
