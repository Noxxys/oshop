import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginInProgress = false;
  authSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    if (sessionStorage.getItem('loginInProgress') === 'true') {
      this.loginInProgress = true;
    }

    this.authSubscription = auth.user$.subscribe(user => {
      if (user) {
        this.updateUser(user);
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  login() {
    sessionStorage.setItem('loginInProgress', 'true');
    this.auth.login();
  }

  updateUser(user: firebase.User) {
    this.userService.save(user);
    const returnUrl = sessionStorage.getItem('returnUrl');

    if (returnUrl) {
      this.navigateToReturnUrl(returnUrl);
    }
  }

  navigateToReturnUrl(returnUrl: string) {
    sessionStorage.removeItem('returnUrl');
    sessionStorage.removeItem('loginInProgress');

    // TODO: find a better way to make navigation work
    setTimeout(() => {
      this.loginInProgress = false;
      this.router.navigate([returnUrl]);
    }, 1000);
  }
}
