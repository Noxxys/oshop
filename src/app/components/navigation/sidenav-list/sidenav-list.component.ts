import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AppUser } from 'src/app/models/firebase-objects/app-user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnDestroy {
  @Output() sidenavClose = new EventEmitter();
  appUser: AppUser;
  appUserSubscription: Subscription;

  constructor(private auth: AuthService, private router: Router) {
    auth.appUser$.subscribe(appUser => (this.appUser = appUser));
  }

  ngOnDestroy() {
    if (this.appUserSubscription) {
      this.appUserSubscription.unsubscribe();
    }
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  logout() {
    this.auth.logout().then(() => this.router.navigate(['/']));
  }
}
