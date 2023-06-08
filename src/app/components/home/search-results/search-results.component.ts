import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Volume } from 'src/app/models/interfaces/Volume';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnChanges, OnInit, OnDestroy {
  @Input() books: Volume[] | null = null;
  visibleBooks: Volume[] = [];
  private userFavoriteBooks!: Volume[];
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const authSub = this.authenticationService
      .getUserInstance()
      .subscribe(
        userInstance =>
          (this.userFavoriteBooks = userInstance?.books as Volume[])
      );
    this.subscriptions.push(authSub);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['books'] && this.books) {
      this.visibleBooks = this.books!.map(vol => ({
        ...vol,
        favorite: this.userFavoriteBooks.some(f => f.id === vol.id),
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  openBookPage(book: Volume): void {
    this.router.navigate(['book', book.id], { relativeTo: this.route });
  }
}
