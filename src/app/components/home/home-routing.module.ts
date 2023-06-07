import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { UserPanelComponent } from './user-panel/user-panel.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book', redirectTo: '', pathMatch: 'full' },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'user', redirectTo: '', pathMatch: 'full' },
  { path: 'user/:id', component: UserPanelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
