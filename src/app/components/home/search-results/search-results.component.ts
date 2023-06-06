import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Volume } from 'src/app/models/interfaces/Volume';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  @Input() books: Volume[] | null = null;

  openBookPage(book: Volume): void {
    this.router.navigate(['book', book.id], { relativeTo: this.route });
  }
}
