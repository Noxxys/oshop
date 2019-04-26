import { FirebaseObject } from './firebase-object.interface';

export interface AppUser extends FirebaseObject {
  name: string;
  email: string;
  isAdmin: boolean;
}
