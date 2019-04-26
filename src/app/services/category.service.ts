import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../models/firebase-objects/category.interface';
import { FirebaseCollection } from './firebase-collection';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends FirebaseCollection<Category> {
  constructor(db: AngularFirestore) {
    super(db, '/categories');
  }
}
