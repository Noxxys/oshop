import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ShoppingCart } from '../models/firebase-objects/shopping-cart.interface';
import { FirebaseCollection } from './firebase-collection';
import { Product } from '../models/firebase-objects/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCartItemService } from './shopping-cart-item.service';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from '../models/firebase-objects/shopping-cart-item.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService extends FirebaseCollection<ShoppingCart> {
  constructor(
    db: AngularFirestore,
    private itemService: ShoppingCartItemService
  ) {
    super(db, '/shopping-carts');
  }

  async initialize() {
    const cartId = await this.getOrCreateCartId();
    this.initializeItemService(cartId);
  }

  // TODO: make the create method of the super class private, so this can also be private
  create(): Promise<DocumentReference> {
    const cart: ShoppingCart = {
      dateCreated: new Date(),
    };

    return super.create(cart) as Promise<DocumentReference>;
  }

  async getOrCreateCartId(): Promise<string> {
    const storedId = localStorage.getItem('cartId');

    if (storedId) {
      return storedId;
    }

    const result = (await this.create()) as DocumentReference;
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  private initializeItemService(cartId: string) {
    this.itemService.initialize(cartId);
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    this.initializeItemService(cartId);
    const item$ = this.itemService.get(product.id);

    item$.pipe(take(1)).subscribe(item => {
      if (item.product) {
        this.itemService.increaseQuantity(item.id, item);
      } else {
        this.itemService.createItemFromProduct(product, product.id);
      }
    });
  }

  removeFromCart(id: string) {
    return this.itemService.decreaseQuantity(id);
  }

  getNumberOfItemsInCart(): Observable<number> {
    return this.itemService
      .getAll()
      .pipe(
        map(items =>
          items.reduce((sum, item) => (sum += item.quantity || 0), 0)
        )
      );
  }

  getItem(itemId: string): Observable<ShoppingCartItem> {
    return this.itemService.get(itemId);
  }

  getAllItems(): Observable<ShoppingCartItem[]> {
    return this.itemService.getAll();
  }

  async deleteCart() {
    const cartId = await this.getOrCreateCartId();
    await this.itemService.deleteCollection();
    this.delete(cartId);
    localStorage.removeItem('cartId');
  }
}
