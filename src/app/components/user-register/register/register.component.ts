import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { UserCredential } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
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
  @ViewChild('submitBtn') submitBtn!: MatButton;

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private logService: LogService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      email: [null],
      password: [null],
      repeatedPassword: [null],
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
      this.submitBtn.disabled = true;
      const userCredentials: UserCredential =
        await this.authenticationService.registerUser(formValues);

      await this.userService.addUser({
        ...formValues,
        id: userCredentials.user.uid,
      });

      this.authenticationService.setUserInstance(userCredentials);

      this.logService.showSuccessLog('Cadastro concluído!');
      this.resetForm();
      this.addFormValidators();
      this.router.navigate(['/', 'home'], { replaceUrl: true });
    } catch (err) {
      const log = this.validationService.handleFirebaseError(
        err as FirebaseError
      );
      this.logService.showErrorLog(log);
    }

    this.isRegistering = false;
    this.submitBtn.disabled = false;
  }

  syncPasswordInputValues(): void {
    this.form.get('password')?.updateValueAndValidity();
    this.form.get('repeatedPassword')?.updateValueAndValidity();
  }

  addFormValidators(): void {
    this.form
      .get('password')
      ?.addValidators([Validators.required, Validators.maxLength(200)]);

    this.form
      .get('name')
      ?.addValidators([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]);

    this.form.get('repeatedPassword')?.addValidators([Validators.required]);

    this.form.get('email')?.addValidators([Validators.required]);

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
    Object.values(this.form.controls).forEach(control => {
      control.clearValidators();
      control.updateValueAndValidity();
    });
  }
}
