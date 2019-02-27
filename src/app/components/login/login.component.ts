import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginInProgress = false;

  constructor(private auth: AuthService, private userService: UserService, private router: Router) {
    if (sessionStorage.getItem('loginInProgress') === 'true') {
      this.loginInProgress = true;
      console.log('loginInProgress', this.loginInProgress);
    }

    auth.user$.subscribe(user => {
      if (user) {
        this.updateUser(user);
      }
    });
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
      console.log('loginInProgress', this.loginInProgress);
      this.router.navigate([returnUrl]);
    }, 1000);
  }
}
