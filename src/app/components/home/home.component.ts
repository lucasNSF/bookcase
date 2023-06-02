import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/interfaces/User';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BookService } from 'src/app/services/book/book.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  user: Partial<User> | null = null;
  isDark!: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private themeService: ThemeService,
    private bookService: BookService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.authenticationService.getUserInstance();

    const themeSubs = this.themeService
      .getTheme()
      .subscribe(theme => (this.isDark = theme));

    this.subscriptions.push(themeSubs);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
