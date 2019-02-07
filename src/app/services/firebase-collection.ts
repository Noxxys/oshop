import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class FirebaseCollection<T> {
  collection: AngularFirestoreCollection<T>;

  constructor(private db: AngularFirestore, private name: string) {
    this.collection = this.db.collection<T>(name);
   }

  get(id: string): Observable<T> {
    return this.db.doc<T>(`/${this.name}/${id}`).valueChanges();
  }

  getAll(): Observable<T[]> {
    return this.collection.snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        // return { id, ...data};
        return Object.assign({ id }, data);
      }))
    );
  }

  create(product: T) {
    this.collection.add(product);
  }

  sortBy(orderBy: string): FirebaseCollection<T>   {
    this.collection = this.db.collection<T>(this.name, ref => ref.orderBy(orderBy));
    return this;
  }
}
