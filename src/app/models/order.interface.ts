import { ShoppingCartItem } from './shopping-cart-item.interface';
import { Address } from './address';
import { FirebaseObject } from './firebase-object.interface';

export interface Order extends FirebaseObject {
  shoppingCartItems: ShoppingCartItem[];
  address: Address;
  userId: string;
}