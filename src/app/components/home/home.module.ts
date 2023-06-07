import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SearchBooksComponent } from './search-books/search-books.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { LoadService } from 'src/app/services/load/load.service';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { LogService } from 'src/app/services/log/log.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    SearchBooksComponent,
    SearchResultsComponent,
    BookDetailsComponent,
    UserPanelComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule,
    ThemeSwitchComponent,
    ToolbarComponent,
    SharedModule,
  ],
  providers: [BookService, LoadService, LogService],
})
export class HomeModule {}
