import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from '../models/firebase-objects/app-user.interface';
import { ConfigurationService } from './configuration.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService,
    private config: ConfigurationService
  ) {
    this.user$ = angularFireAuth.authState;
  }

  login(): Promise<void> {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    sessionStorage.setItem('returnUrl', returnUrl);
    return this.angularFireAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  async logout(): Promise<void> {
    await this.angularFireAuth.auth.signOut();
    this.config.userId = null;
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          this.config.userId = user.uid;
          return this.userService.get(user.uid);
        }

        return of(null);
      })
    );
  }
}
