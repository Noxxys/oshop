import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Product } from '../models/firebase-objects/product';
import { ShoppingCartItem } from '../models/firebase-objects/shopping-cart-item.interface';
import { FirebaseCollection } from '../models/firebase-collection';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartItemService extends FirebaseCollection<
  ShoppingCartItem
> {
  constructor(db: AngularFirestore, config: ConfigurationService) {
    const cartId = config.shoppingCartId;
    const path = `/shopping-carts/${cartId}/items`;
    super(db, path);
  }

  createItemFromProduct(
    product: Product,
    id?: string
  ): Promise<DocumentReference> | Promise<void> {
    const newItem: ShoppingCartItem = {
      product: product,
      quantity: 1,
      id: product.id,
    };
    return super.createWithId(newItem, id);
  }

  increaseQuantity(id: string, item: ShoppingCartItem): Promise<void> {
    item.quantity += 1;
    return super.update(id, item);
  }

  decreaseQuantity(id: string) {
    this.get(id)
      .pipe(take(1))
      .subscribe(item => {
        if (item.quantity < 2) {
          this.delete(id);
        } else {
          item.quantity -= 1;
          return super.update(id, item);
        }
      });
  }
}
