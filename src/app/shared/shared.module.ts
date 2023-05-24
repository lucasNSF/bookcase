import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordVisibilityDirective } from './directives/change-password-visibility.directive';

@NgModule({
  declarations: [ChangePasswordVisibilityDirective],
  imports: [CommonModule],
  exports: [ChangePasswordVisibilityDirective],
})
export class SharedModule {}
