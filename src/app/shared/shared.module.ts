import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordVisibilityDirective } from './directives/change-password-visibility.directive';
import { FormDebugComponent } from './form-debug/form-debug.component';

@NgModule({
  declarations: [ChangePasswordVisibilityDirective, FormDebugComponent],
  imports: [CommonModule],
  exports: [ChangePasswordVisibilityDirective, FormDebugComponent],
})
export class SharedModule {}
