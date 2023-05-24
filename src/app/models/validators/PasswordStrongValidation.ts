import { AbstractControl, ValidationErrors } from '@angular/forms';

import { ValidationStrategy } from '../interfaces/ValidationStrategy';

export class PasswordStrongValidation implements ValidationStrategy {
  apply(control: AbstractControl): ValidationErrors | null {
    const password: string = control.value;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#.]{8,}$/;

    if (!regex.test(password)) {
      return { weakPassword: true };
    }

    return null;
  }
}
