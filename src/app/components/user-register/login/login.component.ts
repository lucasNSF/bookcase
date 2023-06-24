import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  browserLocalPersistence,
  browserSessionPersistence,
} from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { take } from 'rxjs';
import { EmailAndPasswordFactory } from 'src/app/models/authMethods/EmailAndPasswordFactory';
import { EmailValidation } from 'src/app/models/validators/EmailValidation';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LogService } from 'src/app/services/log/log.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  isRegistering = false;
  form!: FormGroup;
  @ViewChild('loginBtn') loginBtn!: MatButton;

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private authenticationService: AuthenticationService,
    private logService: LogService,
    private router: Router,
    private authFactory: EmailAndPasswordFactory
  ) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      stayConnected: false,
    });
  }

  ngOnInit(): void {
    this.authenticationService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe(user => {
        if (user) {
          this.logService.showSuccessLog(
            `Continuando como ${user.displayName?.normalize()}...`
          );
          this.router.navigate(['/home'], { replaceUrl: true });
        }
      });
  }

  ngAfterViewInit(): void {
    this.validationService.apply(
      this.form.get('email')!,
      new EmailValidation()
    );
  }

  async login(): Promise<void> {
    const formValues = this.form.value;

    try {
      this.isRegistering = true;
      this.loginBtn.disabled = true;

      const emailAndPasswordAuth = this.authFactory.create({
        email: formValues['email'],
        password: formValues['password'],
      });
      const persistence = this.form.value['stayConnected']
        ? browserLocalPersistence
        : browserSessionPersistence;

      this.authenticationService.signIn(emailAndPasswordAuth, persistence);
      this.logService.showSuccessLog('Login efetuado com sucesso!');
      this.router.navigate(['/', 'home'], { replaceUrl: true });
    } catch (err) {
      const log = this.validationService.handleFirebaseError(
        err as FirebaseError
      );
      this.logService.showErrorLog(log);
    }

    this.isRegistering = false;
    this.loginBtn.disabled = false;
  }
}
