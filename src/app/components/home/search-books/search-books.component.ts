import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { VolumeCollection } from 'src/app/models/interfaces/VolumeCollection';
import { BookService } from 'src/app/services/book/book.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss'],
})
export class SearchBooksComponent implements OnInit, OnDestroy {
  isDark = true;
  @ViewChild('searchBtn') searchBtn!: ElementRef<HTMLInputElement>;
  @Output() searchEvent = new EventEmitter<VolumeCollection>();
  inputActions: Record<string, () => void> = {
    Escape: () => {
      this.searchBtn.nativeElement.blur();
      this.searchBtn.nativeElement.value = '';
    },
    Enter: () => {
      const query = this.searchBtn.nativeElement.value.trim();
      if (query) {
        const subscription = this.bookService
          .getBooksByName(query)
          .subscribe(vol => {
            this.searchEvent.emit(vol);
          });
        this.subscriptions.push(subscription);
        this.searchBtn.nativeElement.blur();
      }
    },
  };
  private subscriptions: Subscription[] = [];

  constructor(
    private themeService: ThemeService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const subscription = this.themeService
      .getTheme()
      .subscribe(isDarkTheme => (this.isDark = isDarkTheme));
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onKeyUp({ code }: KeyboardEvent): void {
    const event = this.inputActions[code];
    if (event) event();
  }
}
