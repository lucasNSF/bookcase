import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentReference,
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserAlreadyExistsError } from 'src/app/models/errors/UserAlreadyExistsError';
import { User } from 'src/app/models/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<Partial<User> | null>(null);

  constructor(private firestore: Firestore) {}

  getUser(userId: string): Observable<Partial<User> | null> {
    const docRef = doc(this.firestore, 'users', userId);
    getDoc(docRef).then(docSnap => {
      if (!docSnap.exists()) {
        this.userSubject.next(null);
      } else {
        this.userSubject.next(docSnap.data());
      }
    });
    return this.userSubject.asObservable();
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
