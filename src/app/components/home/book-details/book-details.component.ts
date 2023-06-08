import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Volume } from 'src/app/models/interfaces/Volume';
import { BookService } from 'src/app/services/book/book.service';
import { LoadService } from 'src/app/services/load/load.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  book: Volume | null = null;
  @ViewChild('loadContainer', { read: ViewContainerRef })
  loadContainer!: ViewContainerRef;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private loadService: LoadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const sub = this.route.params.subscribe(params => {
      const id = params['id'];
      const bookSub = this.bookService.getBook(id).subscribe(vol => {
        this.loadService.addLoadBar(this.loadContainer);
        this.book = vol;
      });
      this.subscriptions.push(bookSub);
    });
    this.subscriptions.push(sub);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadService.closeLoadBar(this.loadContainer);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  buyBook(): void {
    console.log('buy book!');
  }
}
