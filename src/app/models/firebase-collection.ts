import {
  AngularFirestoreCollection,
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, switchMap, tap } from 'rxjs/operators';
import { FirebaseObject } from './firebase-objects/firebase-object.interface';

export abstract class FirebaseCollection<T extends FirebaseObject> {
  private collection: AngularFirestoreCollection<T>;
  private _path: string;

  constructor(protected db: AngularFirestore, initialPath: string) {
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
    return this.collection
      .doc(requestedId)
      .snapshotChanges()
      .pipe(
        map(action => {
          const data = action.payload.data();
          const id = action.payload.id;
          return Object.assign({ id }, data);
        })
      ) as Observable<T>;
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

  getAllWhere(
    fieldPath: firebase.firestore.FieldPath,
    filterOp: firebase.firestore.WhereFilterOp,
    value: any
  ): Observable<T[]> {
    return this.db
      .collection(this._path, ref => ref.where(fieldPath, filterOp, value))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(action => {
            const data = action.payload.doc.data();
            const id = action.payload.doc.id;
            return Object.assign({ id }, data) as T;
          })
        )
      );
  }

  // TODO: should I convert all promises to observables?
  create(object: T): Promise<DocumentReference> {
    // Firebase is not able to handle class instances, only objects
    const newObject = JSON.parse(JSON.stringify(object));
    return this.collection.add(newObject);
  }

  createWithId(object: T, id: string): Promise<void> {
    // Firebase is not able to handle class instances, only objects
    const newObject = JSON.parse(JSON.stringify(object));
    return this.collection.doc(id).set(newObject);
  }

  update(id: string, object: T): Promise<void> {
    //return this.db.doc<T>(`${this.path}/${id}`).update(object);
    return this.collection.doc(id).update(object);
  }

  delete(id: string): Promise<void> {
    //return this.db.doc<T>(`${this.path}/${id}`).delete();
    return this.collection.doc(id).delete();
  }

  async deleteCollection(): Promise<void> {
    // no way to delete a collection, we have to delete all the documents inside the collection
    // return this.collection.get().pipe(
    //   take(1),
    //   switchMap(async snapshot => {
    //     const promises = snapshot.docs.map(doc => doc.ref.delete());

    //     try {
    //       await Promise.all(promises);
    //     } catch (error) {
    //       console.log(
    //         `Couldn't delete collection ${this.path} because ${error}`
    //       );
    //     }
    //   })
    // ).toPromise();

    try {
      const snapshot = await this.collection.get().toPromise();
      const deletionPromises = snapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(deletionPromises);
    } catch (error) {
      console.log(`Couldn't delete collection ${this.path} because ${error}`);
    }
  }

  // // TODO: refactor this to be chainable multiple times
  // sortBy(orderBy: string): firebase.firestore.Query {
  //   return this.collection.ref.orderBy(orderBy);
  //   // this.collection = this.db.collection<T>(this.path, ref =>
  //   //   ref.orderBy(orderBy)
  //   // );
  //   // return this;
  // }
}
