import { LogInfoModule } from './../log-info/log-info.module';
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
import { LogService } from 'src/app/services/log/log.service';

@NgModule({
  declarations: [RegisterComponent, FormDebugComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    UserRegisterRoutingModule,
    ThemeSwitchModule,
    AngularMaterialModule,
    LogInfoModule,
  ],
  providers: [
    ValidationService,
    UserService,
    AuthenticationService,
    LogService,
  ],
})
export class UserRegisterModule {}
