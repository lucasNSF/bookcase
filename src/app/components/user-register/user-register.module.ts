import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInfoModule } from './../log-info/log-info.module';

import { ValidationService } from 'src/app/services/validation/validation.service';

import { LogService } from 'src/app/services/log/log.service';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemeSwitchModule } from '../theme-switch/theme-switch.module';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { RegisterComponent } from './register/register.component';
import { UserRegisterRoutingModule } from './user-register-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [RegisterComponent, FormDebugComponent, LoginComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    UserRegisterRoutingModule,
    ThemeSwitchModule,
    AngularMaterialModule,
    LogInfoModule,
    SharedModule,
  ],
  providers: [ValidationService, LogService],
})
export class UserRegisterModule {}
