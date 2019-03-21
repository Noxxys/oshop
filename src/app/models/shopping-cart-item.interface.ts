import { Product } from './product';

export interface ShoppingCartItem {
  id?: string;
  quantity: number;
  product: Product;
}