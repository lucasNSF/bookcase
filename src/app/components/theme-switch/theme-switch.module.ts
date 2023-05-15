import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeSwitchComponent } from './theme-switch.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

@NgModule({
  declarations: [ThemeSwitchComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [ThemeSwitchComponent],
})
export class ThemeSwitchModule {}
