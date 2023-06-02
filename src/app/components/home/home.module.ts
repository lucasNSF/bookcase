import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ThemeSwitchModule } from '../theme-switch/theme-switch.module';
import { BookService } from 'src/app/services/book/book.service';
import { SearchBooksComponent } from './search-books/search-books.component';

@NgModule({
  declarations: [HomeComponent, SearchBooksComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule,
    ThemeSwitchModule,
  ],
  providers: [BookService],
})
export class HomeModule {}
