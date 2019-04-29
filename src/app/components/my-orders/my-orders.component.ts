import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/firebase-objects/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent {
  orders$: Observable<Order[]>;

  constructor(orderService: OrderService, authService: AuthService) {
    // TODO: try to log out from each page to see what happens. There should be no error, and potentially some redirects
    authService.appUser$.subscribe(user => {
      if (user) {
        this.orders$ = orderService.getAllForUser(user.id);
      }
    });
  }
}
