import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/interfaces/User';
import { Volume } from 'src/app/models/interfaces/Volume';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit, OnDestroy {
  @Input() book!: Volume;
  user: Partial<User> | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const authSub = this.authenticationService
      .getUserInstance()
      .subscribe(userInstance => (this.user = userInstance));
    this.subscriptions.push(authSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  toggleFavoriteBook(event: MouseEvent): void {
    event.stopPropagation();

    if (!this.book.favorite) {
      this.userService.addFavoriteBook(this.book, this.user as Partial<User>);
      this.book.favorite = true;
    } else {
      this.userService.removeFavoriteBook(
        this.book,
        this.user as Partial<User>
      );
      this.book.favorite = false;
    }
  }

  openBookPage(book: Volume): void {
    this.router.navigate(['/home/book', book.id]);
  }
}
