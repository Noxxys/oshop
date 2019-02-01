import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

  getAll(): Observable<Category[]> {
    return this.db.collection<Category>('/categories', ref => ref.orderBy('name')).snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data};
      }))
    );
  }
}
