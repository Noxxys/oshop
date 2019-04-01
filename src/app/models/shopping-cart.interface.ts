import { FirebaseObject } from './firebase-object.interface';

export interface ShoppingCart extends FirebaseObject {
  dateCreated: Date;
}