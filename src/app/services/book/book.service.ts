import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly API_URL = 'https://www.googleapis.com/books/v1/';
}
