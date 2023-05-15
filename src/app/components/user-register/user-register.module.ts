import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { RegisterComponent } from './register/register.component';
import { UserRegisterRoutingModule } from './user-register-routing.module';
import { ThemeSwitchModule } from '../theme-switch/theme-switch.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

@NgModule({
  declarations: [RegisterComponent, FormDebugComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    UserRegisterRoutingModule,
    ThemeSwitchModule,
    AngularMaterialModule,
  ],
  providers: [ValidationService, UserService, AuthenticationService],
})
export class UserRegisterModule {}
