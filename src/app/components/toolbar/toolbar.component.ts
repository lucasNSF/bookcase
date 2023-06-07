import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/interfaces/User';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [AngularMaterialModule, ThemeSwitchComponent, SharedModule],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  user: Partial<User> | null = null;
  isDark!: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userSub = this.authenticationService
      .getUserInstance()
      .subscribe(userInstance => (this.user = userInstance));
    this.subscriptions.push(userSub);

    const themeSub = this.themeService
      .getTheme()
      .subscribe(theme => (this.isDark = theme));
    this.subscriptions.push(themeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  goToUserPanel(): void {
    this.router.navigate(['/home/user', this.user?.id]);
  }
}
