import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidation } from 'src/app/models/validators/EmailValidation';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  isRegistering = false;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService
  ) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    this.validationService.apply(
      this.form.get('email')!,
      new EmailValidation()
    );
  }

  login(): void {}
}
