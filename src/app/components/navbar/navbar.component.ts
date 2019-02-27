import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppUser } from 'src/app/models/app-user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  appUser: AppUser;

  constructor(private auth: AuthService, private router: Router) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout().then(() => this.router.navigate(['/']));
  }
}
