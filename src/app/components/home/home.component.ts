import { Component } from '@angular/core';
import { Volume } from 'src/app/models/interfaces/Volume';
import { VolumeCollection } from 'src/app/models/interfaces/VolumeCollection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  receivedBooks!: Volume[];

  handleBooks(books: VolumeCollection): void {
    this.receivedBooks = books.items;
  }
}
