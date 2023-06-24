import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/interfaces/User';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { UserService } from 'src/app/services/user/user.service';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';

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
    private userService: UserService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const authSub = this.authenticationService
      .getCurrentUser()
      .subscribe(user => {
        if (user) {
          const userSub = this.userService
            .getUser(user.uid)
            .subscribe(userInstance => {
              this.user = userInstance;
            });
          this.subscriptions.push(userSub);
        }
      });
    this.subscriptions.push(authSub);

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
