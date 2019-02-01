import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  save(user: firebase.User) {
    this.db.doc('/users/' + user.uid).set({
      name: user.displayName,
      email: user.email
    }, { merge: true });
  }

  get(uid: string): Observable<AppUser> {
    return this.db.doc<AppUser>('/users/' + uid).valueChanges();
  }
}
