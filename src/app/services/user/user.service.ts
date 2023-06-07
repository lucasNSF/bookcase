import { Injectable } from '@angular/core';
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { BehaviorSubject, defer, switchMap } from 'rxjs';
import { UserAlreadyExistsError } from 'src/app/models/errors/UserAlreadyExistsError';
import { User } from 'src/app/models/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<Partial<User> | null>(null);

  constructor(private firestore: Firestore) {}

  getUser(userId: string) {
    const docRef = doc(this.firestore, 'users', userId);
    return defer(async () => {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        this.userSubject.next(null);
      }
      this.userSubject.next(docSnap.data() as Partial<User>);
    }).pipe(switchMap(() => this.userSubject.asObservable()));
  }

  updateUser(userId: string, updatedPaths: Partial<User>) {
    const userRef = doc(this.firestore, 'users', userId);
    updateDoc(userRef, updatedPaths);
    const updatedUser = { ...(this.userSubject.value || {}), ...updatedPaths };
    this.userSubject.next(updatedUser);
  }

  async deleteUser(userId: string): Promise<void> {
    await deleteDoc(doc(this.firestore, 'users', userId));
  }

  async addUser(user: User): Promise<void> {
    const firestoreUser: Partial<User> = Object.assign({}, user);
    firestoreUser.books = [];
    firestoreUser.profilePhoto = '';
    delete firestoreUser.password;
    const docRef: DocumentReference<Partial<User>> = doc(
      this.firestore,
      'users',
      firestoreUser.id!
    ) as DocumentReference<Partial<User>>;

    if (await this.emailAlreadyExists(firestoreUser.email!)) {
      throw new UserAlreadyExistsError();
    }

    await setDoc(docRef, firestoreUser);
  }

  async emailAlreadyExists(email: string): Promise<boolean> {
    const dbInstance = this.getDBInstance();
    const emailQuerySnap = await getDocs(
      query(dbInstance, where('email', '==', email))
    );
    if (!emailQuerySnap.size) return false;
    return true;
  }

  private getDBInstance(): CollectionReference<Partial<User>> {
    const dbInstance: CollectionReference<Partial<User>> = collection(
      this.firestore,
      'users'
    );
    return dbInstance;
  }
}
