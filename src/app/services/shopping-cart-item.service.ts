import { Injectable } from '@angular/core';
import { FirebaseCollection } from './firebase-collection';
import { ShoppingCartItem } from '../models/shopping-cart-item.interface';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartItemService extends FirebaseCollection<
  ShoppingCartItem
> {
  isInitialized = false;

  constructor(db: AngularFirestore) {
    super(db, null);
  }

  initialize(shoppingCartId: string) {
    // TODO: store paths in a constants class
    this.path = `/shopping-carts/${shoppingCartId}/items`;
    this.isInitialized = true;
  }

  private throwIfNotInitialized() {
    if (!this.isInitialized) {
      throw new Error(
        'ShoppingCartItemService: you must call initialize(shoppingCartId) before calling other methods of this class.'
      );
    }
  }

  get(requestedId: string): Observable<ShoppingCartItem> {
    this.throwIfNotInitialized();
    return super.get(requestedId);
  }

  getAll(): Observable<ShoppingCartItem[]> {
    this.throwIfNotInitialized();
    return super.getAll();
  }

  createItemFromProduct(
    product: Product,
    id?: string
  ): Promise<DocumentReference> | Promise<void> {
    this.throwIfNotInitialized();

    const newItem: ShoppingCartItem = {
      product: product,
      quantity: 1,
      id: product.id,
    };
    return super.create(newItem, id);
  }

  update(id: string, item: ShoppingCartItem): Promise<void> {
    this.throwIfNotInitialized();
    return super.update(id, item);
  }

  delete(id: string): Promise<void> {
    this.throwIfNotInitialized();
    return super.delete(id);
  }

  increaseQuantity(id: string, item: ShoppingCartItem): Promise<void> {
    this.throwIfNotInitialized();
    item.quantity += 1;
    return super.update(id, item);
  }

  decreaseQuantity(id: string) {
    this.throwIfNotInitialized();

    // TODO: convert all promises to observables
    this.get(id).pipe(take(1)).subscribe(item => {
      if (item.quantity < 2) {
        this.delete(id);
      } else {
        item.quantity -= 1;
        return super.update(id, item);
      }
    });
  }
}
