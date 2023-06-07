import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { StorageError, getDownloadURL } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/interfaces/User';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoadService } from 'src/app/services/load/load.service';
import { LogService } from 'src/app/services/log/log.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit, OnDestroy {
  isDark!: boolean;
  user: Partial<User> | null = null;
  @ViewChild('loadContainer', { read: ViewContainerRef })
  loadContainer!: ViewContainerRef;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private logService: LogService,
    private storageService: StorageService,
    private loadService: LoadService,
    private changeDetectorRef: ChangeDetectorRef,
    private validationService: ValidationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.checkUserIdentity();
    const themeSub = this.themeService
      .getTheme()
      .subscribe(theme => (this.isDark = theme));
    this.subscriptions.push(themeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  closePage(): void {
    this.router.navigate(['home'], { replaceUrl: true });
  }

  onFileSelected(event: Event): void {
    const inputTarget = event.target as HTMLInputElement;
    const file = inputTarget.files?.item(0);
    if (!file) return;
    const uploadTask = this.storageService.uploadProfilePhoto(
      file,
      this.user?.id as string
    );
    const componentRef = this.loadService.addDeterminateLoadBar(
      this.loadContainer
    );
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        componentRef.setInput('value', progress);
        this.changeDetectorRef.detectChanges();
      },
      error => {
        const message = this.validationService.handleStorageError(
          error as StorageError
        );
        this.logService.showErrorLog(message);
      },
      async () => {
        this.loadService.closeLoadBar(this.loadContainer);
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        await this.userService.updateUser(this.user?.id as string, {
          profilePhoto: downloadUrl,
        });
        this.logService.showSuccessLog('Imagem de perfil atualizada!');
      }
    );
  }

  private async checkUserIdentity(): Promise<void> {
    const user = await this.authenticationService.getUserInstance();
    if (!user) {
      this.logService.showErrorLog('Ocorreu um erro, faça login novamente!');
      this.authenticationService.removeUserInstance();
      this.router.navigate(['login'], { replaceUrl: true });
    }

    const userSub = this.route.params.subscribe(params => {
      const userId: string = params['id'];
      if (userId !== user?.id) {
        this.logService.showErrorLog('Acesso negado!');
        this.authenticationService.removeUserInstance();
        this.router.navigate(['login'], { replaceUrl: true });
      } else {
        this.user = user;
      }
    });

    this.subscriptions.push(userSub);
  }
}
