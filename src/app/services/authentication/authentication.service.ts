import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { User } from 'src/app/models/interfaces/User';

import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: Auth, private UserService: UserService) {}

  setUserInstance(credential: UserCredential): void {
    localStorage.setItem('userId', credential.user.uid);
  }

  async getUserInstance(): Promise<Partial<User> | null> {
    const userId = localStorage.getItem('userId');
    if (!userId) return null;
    return await this.UserService.getUser(userId);
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
}
