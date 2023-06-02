import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Volume } from 'src/app/models/interfaces/Volume';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly API_URL = 'https://www.googleapis.com/books/v1';
  private readonly API_KEY = environment.firebase.apiKey;
  private readonly SEARCH_PARAM = 'printType=books';

  constructor(private http: HttpClient) {}

  getBooksByName(title: string): Observable<Volume> {
    return this.http.get<Volume>(
      `${this.API_URL}/volumes?q=${title}&${this.SEARCH_PARAM}&key=${this.API_KEY}`
    );
  }
}
