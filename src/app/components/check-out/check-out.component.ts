import { Component, OnInit, OnDestroy } from '@angular/core';
import { Address } from 'src/app/models/address';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { take } from 'rxjs/operators';
import { ShoppingCartItem } from 'src/app/models/shopping-cart-item.interface';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/models/app-user.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnDestroy {
  shoppingCartItems: ShoppingCartItem[];
  appUser: AppUser;
  cartSubscription: Subscription;
  authSubscription: Subscription;

  constructor(
    private orderService: OrderService,
    cartService: ShoppingCartService,
    authService: AuthService,
    private router: Router
  ) {
    cartService.initialize();
    this.cartSubscription = cartService
      .getAllItems()
      .pipe(take(1))
      .subscribe(items => (this.shoppingCartItems = items));

      this.authSubscription = authService.appUser$.subscribe(
        appUser => (this.appUser = appUser)
      );
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  onAddressSubmitted(address: Address) {
    const order = new Order();
    order.address = address;
    order.shoppingCartItems = this.shoppingCartItems;
    order.user = this.appUser;

    this.orderService.create(order);
    this.router.navigate(['/order-success']);
  }
}
