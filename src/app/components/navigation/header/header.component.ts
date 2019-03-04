import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppUser } from 'src/app/models/app-user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  appUser: AppUser;

  constructor(private auth: AuthService, private router: Router) {
    auth.appUser$.subscribe(appUser => (this.appUser = appUser));
  }

  ngOnInit() {}

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  logout() {
    this.auth.logout().then(() => this.router.navigate(['/']));
  }
}
