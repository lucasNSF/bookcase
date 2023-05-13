import { AbstractControl, ValidationErrors } from '@angular/forms';

import { ValidationStrategy } from '../interfaces/ValidationStrategy';

export class EmailValidation implements ValidationStrategy {
  apply(control: AbstractControl): ValidationErrors | null {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email: string = control.value;

    if (!regex.test(email)) {
      return { wrongEmail: true };
    }

    return null;
  }
}
