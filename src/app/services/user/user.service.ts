import { Injectable } from '@angular/core';
import { collection, CollectionReference, doc, DocumentReference, DocumentSnapshot, Firestore, getDoc, getDocs, query, Query, QueryDocumentSnapshot, QuerySnapshot, setDoc, where } from '@angular/fire/firestore';
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

  async addUser(user: User): Promise<void> {
    const firestoreUser: Partial<User> = Object.assign({}, user);
    delete firestoreUser.password;
    const docRef: DocumentReference<Partial<User>> = doc(
      this.firestore,
      'users',
      firestoreUser.email!
    ) as DocumentReference<Partial<User>>;
    const docSnap: DocumentSnapshot<Partial<User>> = await getDoc(docRef);

    if (docSnap.exists()) {
      throw new UserAlreadyExistsError();
    }

    await setDoc(docRef, firestoreUser);
  }

  private getDBInstance(): CollectionReference<Partial<User>> {
    const dbInstance: CollectionReference<Partial<User>> = collection(
      this.firestore,
      'users'
    );
    return dbInstance;
  }
}
