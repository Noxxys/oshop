import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShoppingCartItem } from 'src/app/models/firebase-objects/shopping-cart-item.interface';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss'],
})
export class OrderReviewComponent implements OnInit {
  orderId: string;
  items$: Observable<ShoppingCartItem[]>;

  constructor(route: ActivatedRoute, orderService: OrderService) {
    this.orderId = route.snapshot.paramMap.get('id');

    this.items$ = orderService
      .get(this.orderId)
      .pipe(map(order => order.shoppingCartItems));
  }

  ngOnInit() {}
}
