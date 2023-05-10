import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.maxLength(200)]],
      repeatedPassword: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.validationService.apply(
      this.form.get('password')!,
      new PasswordStrongValidation()
    );

    this.validationService.apply(
      this.form.get('repeatedPassword')!,
      new PasswordMatchValidation()
    );
  }

  onSubmit(): void {
    const formValues = this.form.value;
    console.log(formValues);
    this.form.reset();
  }
}
