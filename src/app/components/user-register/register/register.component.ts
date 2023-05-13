import { Component, OnInit } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/interfaces/User';
import { EmailValidation } from 'src/app/models/validators/EmailValidation';
import { PasswordMatchValidation } from 'src/app/models/validators/PasswordMatchValidation';
import { PasswordStrongValidation } from 'src/app/models/validators/PasswordStrongValidation';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
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
    private validationService: ValidationService,
    private userService: UserService,
    private authenticationService: AuthenticationService
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
    this.validationService.apply(
      this.form.get('password')!,
      new PasswordStrongValidation()
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

  async onSubmit(): Promise<void> {
    delete this.form.value['repeatedPassword'];
    const formValues: User = this.form.value;
    formValues.name = formValues.name.trim();

    try {
      const userCredentials: UserCredential =
        await this.authenticationService.registerUser(formValues);
      await this.userService.addUser({
        ...formValues,
        id: userCredentials.user.uid,
      });
    } catch (err) {
      console.error(err);
    }

    this.form.reset();
  }
}
