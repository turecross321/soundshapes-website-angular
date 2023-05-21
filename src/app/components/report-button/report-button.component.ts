import { Component } from '@angular/core';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-report-button',
  templateUrl: './report-button.component.html',
  styleUrls: ['./report-button.component.scss'],
})
export class ReportButtonComponent {
  icon = faFlag;
  onClick() {}
}
