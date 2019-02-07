import { FirebaseObject } from './firebase-object.interface';

export interface Product extends FirebaseObject {
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}
