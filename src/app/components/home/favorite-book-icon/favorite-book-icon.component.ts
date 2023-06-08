import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/interfaces/User';
import { Volume } from 'src/app/models/interfaces/Volume';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-favorite-book-icon',
  templateUrl: './favorite-book-icon.component.html',
  styleUrls: ['./favorite-book-icon.component.scss'],
})
export class FavoriteBookIconComponent implements OnInit, OnDestroy {
  user!: Partial<User> | null;
  @Input() favorite!: boolean;
  @Input() book!: Volume;
  private subscription!: Subscription;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authenticationService
      .getUserInstance()
      .subscribe(userInstance => (this.user = userInstance));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleFavoriteBook(event: MouseEvent): void {
    event.stopPropagation();

    if (!this.favorite) {
      this.userService.addFavoriteBook(this.book, this.user as Partial<User>);
      this.favorite = true;
    } else {
      this.userService.removeFavoriteBook(
        this.book,
        this.user as Partial<User>
      );
      this.favorite = false;
    }
  }
}
