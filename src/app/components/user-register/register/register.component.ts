import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { UserCredential } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/interfaces/User';
import { EmailValidation } from 'src/app/models/validators/EmailValidation';
import { PasswordMatchValidation } from 'src/app/models/validators/PasswordMatchValidation';
import { PasswordStrongValidation } from 'src/app/models/validators/PasswordStrongValidation';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LogService } from 'src/app/services/log/log.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isRegistering = false;

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private logService: LogService
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
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.maxLength(200)]],
      repeatedPassword: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.addFormValidators();
  }

  async onSubmit(): Promise<void> {
    delete this.form.value['repeatedPassword'];
    const formValues: User = this.form.value;
    formValues.name = formValues.name.trim();

    try {
      this.isRegistering = true;
      const userCredentials: UserCredential =
        await this.authenticationService.registerUser(formValues);

      await this.userService.addUser({
        ...formValues,
        id: userCredentials.user.uid,
      });

      this.logService.showSuccessLog('Cadastro concluído!');
      this.resetForm();
    } catch (err) {
      const log = this.validationService.handleFirebaseError(
        err as FirebaseError
      );
      this.logService.showErrorLog(log);
    }

    this.isRegistering = false;
  }

  syncPasswordInputValues(): void {
    this.form.get('password')?.updateValueAndValidity();
    this.form.get('repeatedPassword')?.updateValueAndValidity();
  }

  addFormValidators(): void {
    this.validationService.apply(
      this.form.get('password')!,
      new PasswordStrongValidation()
    );

    this.validationService.apply(
      this.form.get('password')!,
      new PasswordMatchValidation()
    );

    this.validationService.apply(
      this.form.get('repeatedPassword')!,
      new PasswordMatchValidation()
    );

    this.validationService.apply(
      this.form.get('email')!,
      new EmailValidation()
    );
  }

  resetForm(): void {
    this.form.reset();
    Object.values(this.form.controls).forEach(control =>
      control.markAsUntouched()
    );
  }
}
