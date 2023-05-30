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
  constructor(private auth: Auth) {}

  setUserInstance(credential: UserCredential): void {
    localStorage.setItem('userId', credential.user.uid);
  }

  getUserInstance(): string | null {
    return localStorage.getItem('userId');
  }

  removeUserInstance(): void {
    localStorage.removeItem('userId');
  }

  registerUser(user: User): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }
}
