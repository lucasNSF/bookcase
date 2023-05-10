/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { PasswordMatchValidation } from 'src/app/models/validators/PasswordMatchValidation';
import { PasswordStrongValidation } from 'src/app/models/validators/PasswordStrongValidation';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [null],
      repeatedPassword: [null],
    });

    // this.form = this.formBuilder.group({
    //   name: [
    //     null,
    //     Validators.compose([
    //       Validators.required,
    //       Validators.minLength(3),
    //       Validators.maxLength(100),
    //     ]),
    //   ],
    //   email: [null, [Validators.required, Validators.email]],
    //   password: [
    //     null,
    //     [
    //       Validators.required,
    //       Validators.minLength(8),
    //       Validators.maxLength(200),
    //     ],
    //   ],
    //   repeatedPassword: [null, [Validators.required]],
    // });
  }

  ngOnInit(): void {
    this.validationService.setDefaultValidation(this.form.get('name')!, {
      required: true,
      minLength: 3,
      maxLength: 100,
    });

    this.validationService.setDefaultValidation(this.form.get('password')!, {
      required: true,
    });

    this.validationService.setDefaultValidation(
      this.form.get('repeatedPassword')!,
      {
        required: true,
      }
    );

    this.validationService.apply(
      this.form.get('password')!,
      new PasswordStrongValidation()
    );

    this.validationService.apply(
      this.form.get('repeatedPassword')!,
      new PasswordMatchValidation()
    );

    // this.form
    //   .get('repeatedPassword')
    //   ?.addValidators(this.passwordMatchValidator.bind(this));
    // this.form
    //   .get('password')
    //   ?.addValidators(this.passwordStrongValidator.bind(this));
  }

  // passwordStrongValidator(control: AbstractControl): ValidationErrors | null {
  //   const password: string = control.value;
  //   const regex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  //   if (!regex.test(password)) {
  //     return { weakPassword: true };
  //   }

  //   return null;
  // }

  // passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  //   const password: string = this.form.get('password')?.value;
  //   const repeatedPassword: string = control.value;

  //   if (password !== repeatedPassword) {
  //     return { passwordMismatch: true };
  //   }

  //   return null;
  // }

  onSubmit(): void {
    const formValues = this.form.value;
    console.log(formValues);
    this.form.reset();
  }
}
