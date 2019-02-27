import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user.interface';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.user$ = angularFireAuth.authState;
  }

  login(): Promise<void> {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    sessionStorage.setItem('returnUrl', returnUrl);
    return this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.angularFireAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid);
        }

        return of(null);
      }),
    );
  }
}
