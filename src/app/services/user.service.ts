import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user.interface';
import { Observable } from 'rxjs';
import { FirebaseCollection } from './firebase-collection';

@Injectable({
  providedIn: 'root'
})
export class UserService extends FirebaseCollection<AppUser> {

  constructor(db: AngularFirestore) {
    super(db, '/users');
  }

  save(user: firebase.User) {
    this.db.doc(`/${this.path}/${user.uid}`).set({
      name: user.displayName,
      email: user.email
    }, { merge: true });
  }

  // TODO: necessary? can't super.get do that?
  // get(uid: string): Observable<AppUser> {
  //   return this.db.doc<AppUser>('/users/' + uid).valueChanges();
  // }
}
