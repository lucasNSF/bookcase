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
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { UserAlreadyExistsError } from 'src/app/models/errors/UserAlreadyExistsError';
import { User } from 'src/app/models/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  async getUser(userId: string): Promise<Partial<User> | null> {
    const docRef = doc(this.firestore, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return docSnap.data();
  }

  updateUser(userId: string, updatedPaths: Partial<User>): Promise<void> {
    const userRef = doc(this.firestore, 'users', userId);
    return updateDoc(userRef, updatedPaths);
  }

  deleteUser(userId: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'users', userId));
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
