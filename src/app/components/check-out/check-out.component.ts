import { Component, OnDestroy } from '@angular/core';
import { Address } from 'src/app/models/address';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/firebase-objects/order';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCartItem } from 'src/app/models/firebase-objects/shopping-cart-item.interface';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/models/firebase-objects/app-user.interface';
import { Subscription, Observable, BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnDestroy {
  //shoppingCartItems: ShoppingCartItem[];
  appUser: AppUser;
  itemsSubscription: Subscription;
  authSubscription: Subscription;
  //items$: Observable<ShoppingCartItem[]>;
  itemsSubject: BehaviorSubject<ShoppingCartItem[]>;

  constructor(
    private orderService: OrderService,
    private cartService: ShoppingCartService,
    authService: AuthService,
    private router: Router
  ) {
    this.cartService.initialize().then(() => {
      cartService
        .getNumberOfItemsInCart()
        .pipe(take(1))
        .subscribe(num => {
          if (!num) {
            console.error(
              'Tried to access check-out without any items in the shopping cart'
            );
            router.navigate(['/']);
          }
        });

      this.itemsSubject = new BehaviorSubject([]);

      this.itemsSubscription = cartService.getAllItems().subscribe(items => {
        //this.shoppingCartItems = items;
        this.itemsSubject.next(items);
      });

      this.authSubscription = authService.appUser$.subscribe(
        appUser => (this.appUser = appUser)
      );
    });
  }

  ngOnDestroy() {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    this.itemsSubject.complete();
  }

  async onAddressSubmitted(address: Address) {
    const order = new Order();
    order.address = address;
    order.shoppingCartItems = this.itemsSubject.value;
    order.date = new Date();

    const docRef = await this.orderService
      //.initialize(this.appUser.id)
      .create(order);

    this.cartService.deleteCart();
    this.router.navigate(['/order-success'], {
      queryParams: { orderId: docRef.id },
    });
  }
}
