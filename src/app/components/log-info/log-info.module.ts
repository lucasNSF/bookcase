import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { LogInfoComponent } from './log-info.component';

@NgModule({
  declarations: [LogInfoComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [LogInfoComponent],
})
export class LogInfoModule {}
