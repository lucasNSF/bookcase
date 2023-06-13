import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { StorageError, getDownloadURL } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { User } from 'src/app/models/interfaces/User';
import { Volume } from 'src/app/models/interfaces/Volume';
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
export class UserPanelComponent implements OnInit, AfterViewInit, OnDestroy {
  isDark!: boolean;
  user: Partial<User> | null = null;
  favoriteBooks: Volume[] | null = null;
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
    private userService: UserService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.checkUserIdentity();
    const themeSub = this.themeService.getTheme().subscribe(theme => {
      this.isDark = theme;
    });
    this.subscriptions.push(themeSub);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadService.closeLoadBar(this.loadContainer);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  handleLikedBookEvent($bookCard: ElementRef<HTMLElement>): void {
    this.renderer.addClass($bookCard.nativeElement, 'book-hidden');
    setTimeout(() => {
      $bookCard.nativeElement.remove();
    }, 500);
  }

  closePage(): void {
    this.router.navigate(['home'], { replaceUrl: true });
  }

  getFavoriteBooks(): Volume[] {
    return this.user?.books?.map(vol => ({
      ...vol,
      favorite: true,
    })) as Volume[];
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
        componentRef.setInput('progressValue', progress);
        this.changeDetectorRef.detectChanges();
      },
      error => {
        const message = this.validationService.handleStorageError(
          error as StorageError
        );
        this.logService.showErrorLog(message);
      },
      async () => {
        this.logService.showSuccessLog('Imagem de perfil atualizada!');
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        this.userService.updateUser(this.user?.id as string, {
          profilePhoto: downloadUrl,
        });
        this.loadService.closeLoadBar(this.loadContainer);
      }
    );
  }

  private checkUserIdentity(): void {
    const authSub = this.authenticationService
      .getUserInstance()
      .pipe(take(1))
      .subscribe(user => {
        this.loadService.addLoadBar(this.loadContainer);
        if (!user) {
          this.logService.showErrorLog(
            'Ocorreu um erro, faça login novamente!'
          );
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
            this.favoriteBooks = this.getFavoriteBooks();
          }
        });

        this.subscriptions.push(userSub);
      });
    this.subscriptions.push(authSub);
  }
}
