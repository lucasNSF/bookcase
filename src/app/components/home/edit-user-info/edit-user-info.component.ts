import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User as FirebaseUser } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { User } from 'src/app/models/interfaces/User';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LogService } from 'src/app/services/log/log.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

interface FormData {
  name?: string;
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
  private authUser: FirebaseUser | null = null;
  @ViewChild('submitButton') submitButton!: MatButton;
  private subscriptions: Subscription[] = [];
  private validations: Record<string, (inputValue: string) => void> = {
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
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private logService: LogService,
    private dialogService: DialogService,
    private storageService: StorageService
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
    });
  }

  ngOnInit(): void {
    const formSub = this.form.valueChanges.subscribe((changes: FormData) => {
      if (this.user) {
        if (changes.name) this.validations['name'](changes.name);
      }
    });
    this.subscriptions.push(formSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  removeProfilePhoto(): void {
    this.dialogService.openModal(
      'Deseja remover a foto de perfil atual?',
      () => {
        this.userService.updateUser(this.user?.id as string, {
          profilePhoto: '',
        });
        this.logService.showSuccessLog('Foto de perfil removida!');
      }
    );
  }

  deleteAccount(): void {
    this.dialogService.openModal(
      'Você está prestes a excluir sua conta. Você tem certeza?',
      () => {
        console.log('deletando conta...');
      }
    );
  }

  onSubmit(): void {}

  closePage(): void {
    this.router.navigate([{ outlets: { editPanel: null } }], {
      relativeTo: this.route.parent,
      replaceUrl: true,
    });
  }
}
