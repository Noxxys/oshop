import { FirebaseObject } from './firebase-object.interface';

export class Product implements FirebaseObject {
  id?: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}
