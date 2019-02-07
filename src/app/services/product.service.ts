import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../models/product.interface';
import { FirebaseCollection } from './firebase-collection';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends FirebaseCollection<Product> {
  constructor(db: AngularFirestore) {
    super(db, 'products');
  }
}
