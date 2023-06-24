import { Injectable } from '@angular/core';
import {
  Auth,
  browserSessionPersistence,
  User as FirebaseUser,
  onAuthStateChanged,
  Persistence,
  setPersistence,
  signOut,
  updateProfile,
  UserCredential,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { AuthStrategy } from 'src/app/models/interfaces/AuthStrategy';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authUserSubject = new BehaviorSubject<FirebaseUser | null>(null);

  constructor(private auth: Auth) {}

  listenAuthUser(): void {
    onAuthStateChanged(this.auth, user => {
      this.authUserSubject.next(user);
    });
  }

  getCurrentUser(): Observable<FirebaseUser | null> {
    return this.authUserSubject.asObservable();
  }

  updateAuthUserFields(userFields: {
    displayName?: string;
    photoURL?: string;
  }) {
    this.getCurrentUser()
      .pipe(take(1))
      .subscribe(user => {
        if (user) {
          updateProfile(user, userFields).then(() =>
            this.authUserSubject.next(user)
          );
        }
      });
  }

  async signUp(authMethod: AuthStrategy): Promise<UserCredential> {
    await setPersistence(this.auth, browserSessionPersistence);
    return await authMethod.signUp();
  }

  async signIn(
    authMethod: AuthStrategy,
    persistence: Persistence
  ): Promise<UserCredential> {
    await setPersistence(this.auth, persistence);
    return await authMethod.signIn();
  }

  logout(): void {
    signOut(this.auth);
  }
}
