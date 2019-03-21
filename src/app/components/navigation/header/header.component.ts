import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { AppUser } from 'src/app/models/app-user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() public sidenavToggle = new EventEmitter();
  appUser: AppUser;
  authSubscription: Subscription;
  numberInCart: number;
  numberInCartSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    cartService: ShoppingCartService
  ) {
    this.authSubscription = auth.appUser$.subscribe(
      appUser => (this.appUser = appUser)
    );

    cartService.initialize().then(() =>
      cartService.getNumberOfItemsInCart().subscribe(count => {
        this.numberInCart = count;
      })
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.numberInCartSubscription.unsubscribe();
  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  logout() {
    this.auth.logout().then(() => this.router.navigate(['/']));
  }
}
