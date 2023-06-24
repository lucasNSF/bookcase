import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { Volume } from 'src/app/models/interfaces/Volume';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnChanges, OnDestroy {
  @Input() books: Volume[] | undefined;
  booksWithFavorite: Volume[] | undefined;
  private userFavoriteBooks: Volume[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnChanges(): void {
    this.authenticationService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe(user => {
        if (user) {
          this.userService
            .getUser(user.uid)
            .pipe(take(1))
            .subscribe(userInstance => {
              this.userFavoriteBooks = userInstance?.books as Volume[];
              this.updateBooksWithFavorite();
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private updateBooksWithFavorite(): void {
    this.booksWithFavorite = this.books?.map(vol => ({
      ...vol,
      favorite: this.userFavoriteBooks.some(b => b.id === vol.id),
    }));
  }
}
