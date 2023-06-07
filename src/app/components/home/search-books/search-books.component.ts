import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VolumeCollection } from 'src/app/models/interfaces/VolumeCollection';
import { BookService } from 'src/app/services/book/book.service';
import { LoadService } from 'src/app/services/load/load.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss'],
})
export class SearchBooksComponent implements OnInit, OnDestroy {
  isDark = true;
  @Input() inputValue = '';
  @ViewChild('searchBtn') searchBtn!: ElementRef<HTMLInputElement>;
  @ViewChild('loadContainer', { read: ViewContainerRef })
  loadContainer!: ViewContainerRef;
  @Output() searchEvent = new EventEmitter<VolumeCollection>();
  inputActions: Record<string, () => void> = {
    Escape: () => {
      this.searchBtn.nativeElement.blur();
      this.searchBtn.nativeElement.value = '';
    },
    Enter: () => {
      const query = this.searchBtn.nativeElement.value.trim();
      if (query) {
        this.loadService.addLoadBar(this.loadContainer);
        const subscription = this.bookService
          .getBooksByName(query)
          .subscribe(vol => {
            this.searchEvent.emit(vol);
            this.router.navigate(['/home'], { queryParams: { q: query } });
            this.loadService.closeLoadBar(this.loadContainer);
          });
        this.subscriptions.push(subscription);
        this.searchBtn.nativeElement.blur();
      }
    },
  };
  private subscriptions: Subscription[] = [];

  constructor(
    private themeService: ThemeService,
    private bookService: BookService,
    private loadService: LoadService,
    private router: Router
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
