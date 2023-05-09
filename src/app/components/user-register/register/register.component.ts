import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ],
        ],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
          ],
        ],
        repeatedPassword: [null],
      },
      {
        validators: Validators.compose([
          this.passwordMatchValidator.bind(this.form),
        ]),
      }
    );
  }

  onSubmit(): void {
    const formValues = this.form.value;
    console.log(this.form);
    this.form.reset();
  }

  onRepeatedPasswordKeyup(): void {
    this.form.get('repeatedPassword')?.updateValueAndValidity();
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const repeatedPassword = control.get('repeatedPassword')?.value;

    if (password && repeatedPassword && password !== repeatedPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
