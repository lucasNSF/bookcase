import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  UserCredential,
} from '@angular/fire/auth';
import { User } from 'src/app/models/interfaces/User';
import { User as FirebaseUser } from '@angular/fire/auth';

import { UserService } from '../user/user.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: Auth, private userService: UserService) {}

  setUserInstance(credential: UserCredential): void {
    localStorage.setItem('userId', credential.user.uid);
  }

  getUserInstance(): Observable<Partial<User> | null> {
    const userId = localStorage.getItem('userId');
    if (!userId) return of(null);
    return this.userService.getUser(userId);
  }

  getCurrentAuthUser(): FirebaseUser | null {
    return this.auth.currentUser;
  }

  removeUserInstance(): void {
    localStorage.removeItem('userId');
  }

  registerUser(user: User): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  signIn(user: User): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  updateUserPassword(newPassword: string): void {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Current user is null');
    updatePassword(user, newPassword);
  }

  logout(): void {
    signOut(this.auth);
  }
}
