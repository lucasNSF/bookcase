import { Component, Input } from '@angular/core';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

@Component({
  selector: 'app-determinate-load-bar',
  template: `<mat-progress-bar
    mode="determinate"
    [value]="progressValue"></mat-progress-bar>`,
  styleUrls: ['./determinate-load-bar.component.scss'],
  standalone: true,
  imports: [AngularMaterialModule],
})
export class DeterminateLoadBarComponent {
  @Input() progressValue = 0;
}
