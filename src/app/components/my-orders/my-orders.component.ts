import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/firebase-objects/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  columnsToDisplay = ['id', 'description', 'date'];
  fieldsToFilter = ['id', 'description', 'date'];
  dataSource: MatTableDataSource<Order>;
  authSubscription: Subscription;
  ordersSubscription: Subscription;
  filterValue: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(orderService: OrderService, authService: AuthService) {
    // TODO: try to log out from each page to see what happens. There should be no error, and potentially some redirects
    this.dataSource = new MatTableDataSource<Order>();

    authService.appUser$.subscribe(user => {
      if (user) {
        this.ordersSubscription = orderService
          .getAllForUser(user.id)
          .subscribe(orders => (this.dataSource.data = orders));
      }
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }
  }
}
