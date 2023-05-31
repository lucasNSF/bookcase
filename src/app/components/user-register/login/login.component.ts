import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { User } from 'src/app/models/interfaces/User';
import { EmailValidation } from 'src/app/models/validators/EmailValidation';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LogService } from 'src/app/services/log/log.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit, OnInit {
  isRegistering = false;
  form!: FormGroup;
  @ViewChild('loginBtn') loginBtn!: MatButton;

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private authenticationService: AuthenticationService,
    private logService: LogService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    const userInstance = await this.authenticationService.getUserInstance();
    if (userInstance) {
      this.router.navigate(['/', 'home'], { replaceUrl: true });
      this.logService.showSuccessLog(
        `Continuando como ${userInstance.name}...`
      );
    }
  }

  ngAfterViewInit(): void {
    this.validationService.apply(
      this.form.get('email')!,
      new EmailValidation()
    );
  }

  async login(): Promise<void> {
    const formValues: User = this.form.value;

    try {
      this.isRegistering = true;
      this.loginBtn.disabled = true;
      const credentials = await this.authenticationService.signIn(formValues);
      this.authenticationService.setUserInstance(credentials);
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
