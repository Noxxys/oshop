import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartItem } from 'src/app/models/firebase-objects/shopping-cart-item.interface';
import { OrderService } from 'src/app/services/order.service';
import { Address } from 'src/app/models/address';
import { Order } from 'src/app/models/firebase-objects/order';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss'],
})
export class OrderReviewComponent implements OnDestroy {
  orderId: string;
  items$: Observable<ShoppingCartItem[]>;
  //address: Address;
  //addressSubscription: Subscription;
  address$: Observable<Address>;
  order: Order;
  orderSubscription: Subscription;

  constructor(route: ActivatedRoute, orderService: OrderService) {
    this.orderId = route.snapshot.paramMap.get('id');
    const order$ = orderService.get(this.orderId);
    this.orderSubscription = order$.subscribe(order => (this.order = order));
    this.items$ = order$.pipe(map(order => order.shoppingCartItems));
    this.address$ = order$.pipe(map(order => order.address));

    // this.addressSubscription = this.address$.subscribe(
    //   address => (this.address = address)
    // );
  }

  ngOnDestroy() {
    // if (this.addressSubscription) {
    //   this.addressSubscription.unsubscribe();
    // }

    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }
}
