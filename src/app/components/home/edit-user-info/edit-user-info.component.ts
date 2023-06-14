import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { User } from 'src/app/models/interfaces/User';
import { PasswordStrongValidation } from 'src/app/models/validators/PasswordStrongValidation';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LogService } from 'src/app/services/log/log.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

interface FormData {
  name?: string;
  password?: string;
}

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.scss'],
})
export class EditUserInfoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isRegistering = false;
  user: Partial<User> | null = null;
  @ViewChild('submitButton') submitButton!: MatButton;
  private subscriptions: Subscription[] = [];
  private validations: Record<string, (inputValue: string) => void> = {
    password: (inputValue: string) => {
      const userPassword = this.user?.password as string;
      if (this.form.get('password')?.valid && userPassword !== inputValue) {
        this.submitButton.disabled = false;
        return;
      }
      this.submitButton.disabled = true;
    },
    name: (inputValue: string) => {
      const username = this.user?.name?.toLowerCase();
      if (
        this.form.get('name')?.valid &&
        username !== inputValue.toLowerCase()
      ) {
        this.submitButton.disabled = false;
        return;
      }
      this.submitButton.disabled = true;
    },
  };

  constructor(
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
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
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(200),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.validationService.apply(
      this.form.get('password')!,
      new PasswordStrongValidation()
    );

    const formSub = this.form.valueChanges.subscribe((changes: FormData) => {
      if (this.user) {
        if (changes.name) this.validations['name'](changes.name);
        if (changes.password) this.validations['password'](changes.password);
      }
    });
    this.subscriptions.push(formSub);

    this.authenticationService
      .getUserInstance()
      .pipe(take(1))
      .subscribe(userInstance => (this.user = userInstance));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onSubmit(): void {
    this.isRegistering = true;

    if (!this.user) {
      this.logService.showErrorLog('Ocorreu um erro, tente novamente!');
      this.isRegistering = false;
      this.closePage();
      return;
    }

    const formValues: Partial<{ name: string; password: string }> =
      this.form.value;

    if (formValues['name']) {
      this.userService.updateUser(this.user.id!, { name: formValues['name'] });
    }

    if (formValues['password']) {
      try {
        this.authenticationService.updateUserPassword(formValues['password']);
      } catch (err) {
        console.log(err);
      }
    }

    this.logService.showSuccessLog('Dados atualizados!');
    this.closePage();
  }

  closePage(): void {
    this.router.navigate([{ outlets: { editPanel: null } }], {
      relativeTo: this.route.parent,
      replaceUrl: true,
    });
  }
}
