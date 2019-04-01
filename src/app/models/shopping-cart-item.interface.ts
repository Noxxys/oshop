import { Product } from './product';
import { FirebaseObject } from './firebase-object.interface';

export interface ShoppingCartItem extends FirebaseObject {
  quantity: number;
  product: Product;
}