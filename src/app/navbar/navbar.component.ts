import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user$: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user$ = angularFireAuth.authState;
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }
}
