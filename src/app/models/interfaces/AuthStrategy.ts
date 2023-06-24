import { UserCredential } from 'firebase/auth';

export interface AuthStrategy {
  signUp(): Promise<UserCredential>;
  signIn(): Promise<UserCredential>;
}
