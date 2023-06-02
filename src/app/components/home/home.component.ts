import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/interfaces/User';
import { Volume } from 'src/app/models/interfaces/Volume';
import { VolumeCollection } from 'src/app/models/interfaces/VolumeCollection';
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
  receivedBooks!: Volume[];
  private subscriptions: Subscription[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private themeService: ThemeService
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

  handleBooks(books: VolumeCollection): void {
    console.log(books);
    this.receivedBooks = books.items;
  }
}
