import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models/interfaces/Book';
import { Volume } from 'src/app/models/interfaces/Volume';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  @Input() books: Volume[] | null = null;

  getVolumesInfo(): Book[] | null {
    if (this.books) {
      return this.books.map(vol => vol.volumeInfo);
    }
    return null;
  }
}
