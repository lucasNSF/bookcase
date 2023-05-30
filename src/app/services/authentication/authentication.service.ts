import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { User } from 'src/app/models/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userInstance = this.auth.currentUser;

  constructor(private auth: Auth) {}

  setUserInstance(user: UserCredential): void {
    this.userInstance = user.user;
  }

  getUserInstance() {
    return this.userInstance;
  }

  registerUser(user: User): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }
}
