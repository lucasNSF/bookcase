import { AbstractControl, ValidationErrors } from '@angular/forms';

export interface ValidationStrategy {
  apply(control: AbstractControl): ValidationErrors | null;
}
