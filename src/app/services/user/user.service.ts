import { Injectable } from '@angular/core';
import {
  arrayRemove,
  arrayUnion,
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
import { BehaviorSubject, defer, Observable, switchMap } from 'rxjs';
import { UserAlreadyExistsError } from 'src/app/models/errors/UserAlreadyExistsError';
import { User } from 'src/app/models/interfaces/User';
import { Volume } from 'src/app/models/interfaces/Volume';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<Partial<User> | null>(null);

  constructor(private firestore: Firestore) {}

  getUser(userId: string): Observable<Partial<User> | null> {
    const docRef = doc(this.firestore, 'users', userId);
    return defer(async () => {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        this.userSubject.next(null);
      }
      this.userSubject.next(docSnap.data() as Partial<User>);
    }).pipe(switchMap(() => this.userSubject.asObservable()));
  }

  updateUser(userId: string, updatedPaths: Partial<User>): void {
    const userRef = doc(this.firestore, 'users', userId);
    updateDoc(userRef, updatedPaths);
    const updatedUser = { ...(this.userSubject.value || {}), ...updatedPaths };
    this.userSubject.next(updatedUser);
  }

  addFavoriteBook(book: Volume, user: User): void {
    if (user.books.some(vol => vol.id === book.id)) return;
    const userRef = doc(this.firestore, 'users', user.id);
    updateDoc(userRef, { books: arrayUnion(book) }).then(() => {
      user.books.push(book);
      this.userSubject.next(user);
    });
  }

  async removeFavoriteBook(book: Volume, user: User): Promise<void> {
    if (!user.books.some(vol => vol.id === book.id)) return;
    const userRef = doc(this.firestore, 'users', user.id);
    const userBooks = (await getDoc(userRef)).data() as User | undefined;
    if (!userBooks) {
      throw new Error('books attribute is not exists on Firestore');
    }
    const removeBook = userBooks.books.find(vol => vol.id === book.id);
    if (!removeBook) return;
    updateDoc(userRef, { books: arrayRemove(removeBook) }).then(() => {
      user.books = user.books.filter(vol => vol.id !== book.id);
      this.userSubject.next(user);
    });
  }

  async deleteUser(userId: string): Promise<void> {
    await deleteDoc(doc(this.firestore, 'users', userId));
  }

  async addUser(user: User): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...firestoreUser } = user;
    firestoreUser.books = [];
    firestoreUser.profilePhoto = '';
    const docRef: DocumentReference<User> = doc(
      this.firestore,
      'users',
      firestoreUser.id
    ) as DocumentReference<User>;

    if (await this.emailAlreadyExists(firestoreUser.email)) {
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

  private getDBInstance(): CollectionReference<User> {
    const dbInstance = collection(this.firestore, 'users');
    return dbInstance as CollectionReference<User>;
  }
}
