import { Component } from '@angular/core';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

@Component({
  selector: 'app-load-bar',
  template: `<mat-progress-bar mode="indeterminate"></mat-progress-bar>`,
  styleUrls: ['./load-bar.component.scss'],
  standalone: true,
  imports: [AngularMaterialModule],
})
export class LoadBarComponent {}
