import { AbstractControl, ValidationErrors } from '@angular/forms';

import { ValidationStrategy } from './ValidationStrategy';

export class PasswordMatchValidation implements ValidationStrategy {
  apply(control: AbstractControl): ValidationErrors | null {
    const repeatedPassword: string = control.value;
    const originalPassword: string = control.parent?.get('password')?.value;

    if (repeatedPassword !== originalPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
