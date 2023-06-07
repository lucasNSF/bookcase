import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChangePasswordVisibilityDirective } from './directives/change-password-visibility/change-password-visibility.directive';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { UpdateProfilePhotoDirective } from './directives/update-profile-photo/update-profile-photo.directive';

@NgModule({
  declarations: [
    ChangePasswordVisibilityDirective,
    FormDebugComponent,
    UpdateProfilePhotoDirective,
  ],
  imports: [CommonModule],
  exports: [
    ChangePasswordVisibilityDirective,
    FormDebugComponent,
    UpdateProfilePhotoDirective,
  ],
})
export class SharedModule {}
