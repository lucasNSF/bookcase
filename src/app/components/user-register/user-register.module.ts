import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormDebugComponent } from './form-debug/form-debug.component';

import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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
})
export class UserRegisterModule {}
