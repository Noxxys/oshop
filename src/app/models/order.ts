import { ShoppingCartItem } from './shopping-cart-item.interface';
import { Address } from './address';
import { FirebaseObject } from './firebase-object.interface';
import { AppUser } from './app-user.interface';

export class Order implements FirebaseObject {
  id?: string;
  shoppingCartItems: ShoppingCartItem[];
  address: Address;
  user: AppUser;
}