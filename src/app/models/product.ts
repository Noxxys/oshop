import { FirebaseObject } from './firebase-object.interface';
import { Category } from './category.interface';

export class Product implements FirebaseObject {
  id?: string;
  title: string;
  price: number;
  categoryId: string;
  category?: Category;
  imageUrl: string;
}
