import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { RegisterComponent } from './register/register.component';
import { UserRegisterRoutingModule } from './user-register-routing.module';

@NgModule({
  declarations: [RegisterComponent, FormDebugComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    UserRegisterRoutingModule,
  ],
  providers: [ValidationService, UserService],
})
export class UserRegisterModule {}
