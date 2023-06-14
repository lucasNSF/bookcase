import { BookDetailsComponent } from './book-details/book-details.component';
import { EditUserInfoComponent } from './edit-user-info/edit-user-info.component';
import { HomeComponent } from './home.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book', redirectTo: '', pathMatch: 'full' },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'user', redirectTo: '', pathMatch: 'full' },
  {
    path: 'user/:id',
    component: UserPanelComponent,
    children: [
      { path: 'edit', component: EditUserInfoComponent, outlet: 'editPanel' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
