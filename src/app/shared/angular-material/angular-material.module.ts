import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCommonModule,
    MatInputModule,
    MatCardModule,
  ],
})
export class AngularMaterialModule {}
