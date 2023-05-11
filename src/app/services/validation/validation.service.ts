import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationStrategy } from 'src/app/models/interfaces/ValidationStrategy';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  apply(control: AbstractControl, validation: ValidationStrategy): void {
    control.addValidators(validation.apply.bind(control));
  }
}
