import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Volume } from 'src/app/models/interfaces/Volume';
import { VolumeCollection } from 'src/app/models/interfaces/VolumeCollection';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  receivedBooks!: Volume[];
  inputValue = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const routeSub = this.route.queryParams.subscribe(params => {
      const query: string | undefined = params['q'];
      if (query) {
        this.inputValue = query;
        const bookSub = this.bookService
          .getBooksByName(query)
          .subscribe(collection => this.handleBooks(collection));
        this.subscriptions.push(bookSub);
      }
    });
    this.subscriptions.push(routeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  handleBooks(books: VolumeCollection): void {
    this.receivedBooks = books.items;
  }
}
