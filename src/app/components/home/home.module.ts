import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

import { ThemeSwitchModule } from '../theme-switch/theme-switch.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SearchBooksComponent } from './search-books/search-books.component';
import { SearchResultsComponent } from './search-results/search-results.component';

@NgModule({
  declarations: [HomeComponent, SearchBooksComponent, SearchResultsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule,
    ThemeSwitchModule,
  ],
  providers: [BookService],
})
export class HomeModule {}
