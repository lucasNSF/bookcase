import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { ValidationStrategy } from 'src/app/models/validators/ValidationStrategy';

interface DefaultValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  apply(control: AbstractControl, validation: ValidationStrategy): void {
    validation.apply(control);
  }

  setDefaultValidation(
    control: AbstractControl,
    options: DefaultValidation
  ): void {
    const validations: ValidatorFn[] = [];

    if (options.required) {
      validations.push(Validators.required);
    }

    if (options.minLength) {
      validations.push(Validators.minLength(options.minLength));
    }

    if (options.maxLength) {
      validations.push(Validators.maxLength(options.maxLength));
    }

    control.addValidators(validations);
  }
}
