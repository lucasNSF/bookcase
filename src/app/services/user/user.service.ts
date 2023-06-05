import { Injectable } from '@angular/core';
import {
  collection,
  CollectionReference,
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
  where,
} from '@angular/fire/firestore';
import { UserAlreadyExistsError } from 'src/app/models/errors/UserAlreadyExistsError';
import { User } from 'src/app/models/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  async getUsers(): Promise<Partial<User>[]> {
    const users: Partial<User>[] = [];
    const dbInstance = this.getDBInstance();
    const querySnapshot: QuerySnapshot<Partial<User>> = await getDocs(
      dbInstance
    );
    querySnapshot.forEach((document: QueryDocumentSnapshot<Partial<User>>) =>
      users.push(document.data())
    );
    return users;
  }

  async getUsersByName(name: string): Promise<Partial<User>[]> {
    const users: Partial<User>[] = [];
    const dbInstance = this.getDBInstance();
    const usersQuery: Query<Partial<User>> = query(
      dbInstance,
      where('name', '==', name)
    );
    const querySnapshot = await getDocs(usersQuery);
    querySnapshot.forEach(document => users.push(document.data()));
    return users;
  }

  async getUser(userId: string): Promise<Partial<User> | null> {
    const docRef = doc(this.firestore, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return docSnap.data();
  }

  async addUser(user: User): Promise<void> {
    const firestoreUser: Partial<User> = Object.assign({}, user);
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
