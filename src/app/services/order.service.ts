import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseCollection } from '../models/firebase-collection';
import { Order } from '../models/firebase-objects/order';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends FirebaseCollection<Order> {
  constructor(db: AngularFirestore, config: ConfigurationService) {
    const path = `/users/${config.userId}/orders`;
    super(db, path);
  }
}
