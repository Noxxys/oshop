import {
  AngularFirestoreCollection,
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class FirebaseCollection<T> {
  private collection: AngularFirestoreCollection<T>;
  private _path: string;

  constructor(protected db: AngularFirestore, private initialPath: string) {
    this.path = initialPath;
  }

  get path(): string {
    return this._path;
  }

  set path(path: string) {
    this._path = path;
    this.collection = this.db.collection<T>(path);
  }

  get(requestedId: string): Observable<T> {
    return this.db
      .doc<T>(`${this.path}/${requestedId}`)
      .snapshotChanges()
      .pipe(
        map(action => {
          const data = action.payload.data();
          const id = action.payload.id;
          return Object.assign({ id }, data);
        })
      );
  }

  getAll(): Observable<T[]> {
    return this.collection.snapshotChanges().pipe(
      map(actions =>
        actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return Object.assign({ id }, data);
        })
      )
    );
  }

  create(object: T, id?: string): Promise<DocumentReference> | Promise<void>  {
    if (!id) {
      return this.collection.add(object);
    } else {
      return this.collection.doc(id).set(object);
    }
  }

  update(id: string, object: T): Promise<void> {
    return this.db.doc<T>(`${this.path}/${id}`).update(object);
  }

  delete(id: string): Promise<void> {
    return this.db.doc<T>(`${this.path}/${id}`).delete();
  }

  sortBy(orderBy: string): FirebaseCollection<T> {
    this.collection = this.db.collection<T>(this.path, ref =>
      ref.orderBy(orderBy)
    );
    return this;
  }
}
