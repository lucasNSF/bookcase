import { Component, Input } from '@angular/core';
import { Volume } from 'src/app/models/interfaces/Volume';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  @Input() books!: Volume[];
}
