import { Volume } from './Volume';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  books: Volume[];
  profilePhoto: string;
}
