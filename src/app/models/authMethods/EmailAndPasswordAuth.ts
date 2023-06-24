import { Inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';

import { AuthStrategy } from '../interfaces/AuthStrategy';

export class EmailAndPasswordAuth implements AuthStrategy {
  constructor(
    private userData: { email: string; password: string },
    @Inject(Auth) private auth: Auth
  ) {}

  signUp(): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      this.userData.email,
      this.userData.password
    );
  }

  signIn(): Promise<UserCredential> {
    return signInWithEmailAndPassword(
      this.auth,
      this.userData.email,
      this.userData.password
    );
  }
}
