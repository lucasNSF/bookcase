import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChangePasswordVisibilityDirective } from './directives/change-password-visibility/change-password-visibility.directive';
import { FormDebugComponent } from './form-debug/form-debug.component';

@NgModule({
  declarations: [ChangePasswordVisibilityDirective, FormDebugComponent],
  imports: [CommonModule],
  exports: [ChangePasswordVisibilityDirective, FormDebugComponent],
})
export class SharedModule {}
