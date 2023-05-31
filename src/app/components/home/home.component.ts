import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/interfaces/User';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
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
