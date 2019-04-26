import { Injectable } from '@angular/core';
import { FirebaseCollection } from './firebase-collection';
import { Order } from '../models/firebase-objects/order';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends FirebaseCollection<Order> {
  constructor(db: AngularFirestore) {
    super(db, '/orders');
  }


}
