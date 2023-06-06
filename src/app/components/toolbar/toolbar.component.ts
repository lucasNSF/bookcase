import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { User } from 'src/app/models/interfaces/User';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [AngularMaterialModule, ThemeSwitchComponent],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  user: Partial<User> | null = null;
  isDark!: boolean;
  private subscription!: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private themeService: ThemeService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.authenticationService.getUserInstance();

    this.subscription = this.themeService
      .getTheme()
      .subscribe(theme => (this.isDark = theme));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
