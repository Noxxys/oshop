import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsCollection: AngularFirestoreCollection<Product>;

  constructor(private db: AngularFirestore) {
    this.productsCollection = this.db.collection<Product>('products', ref => ref.orderBy('title'));
   }

  get(id: string): Observable<Product> {
    return this.db.doc<Product>('/products/' + id).valueChanges();
  }

  getAll(): Observable<Product[]> {
    return this.productsCollection.valueChanges();
  }

  create(product: Product) {
    this.productsCollection.add(product);
  }
}
