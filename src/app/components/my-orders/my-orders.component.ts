import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/firebase-objects/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class MyOrdersComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  columnsToDisplay = ['products', 'date', 'link'];
  fieldsToFilter = ['products', 'date', 'link'];
  dataSource: MatTableDataSource<Order>;
  authSubscription: Subscription;
  ordersSubscription: Subscription;
  filterValue: string;
  expandedOrder: Order | null; // TODO: really necessary? can't any object be null implicitly?

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(orderService: OrderService, authService: AuthService) {
    // TODO: try to log out from each page to see what happens. There should be no error, and potentially some redirects
    this.dataSource = new MatTableDataSource<Order>();

    this.authSubscription = authService.appUser$.subscribe(user => {
      if (user) {
        this.ordersSubscription = this.ordersSubscription = orderService
          .getAllForUser(user.id)
          .subscribe(orders => {
            this.dataSource.data = orders;
          });
      }
    });
  }

  ngOnInit() {
    console.log('ngOnInit', this.paginator);
    // TODO: check if sorting is working, other fix it like the paginator
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit', this.paginator);
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked', this.paginator);
    if (this.paginator && !this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
      console.log('dataSource.paginator', this.dataSource.paginator);
    }

    if (this.sort && !this.dataSource.sort) {
      this.dataSource.sort = this.sort;
      console.log('dataSource.sort', this.dataSource.sort);
    }
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }
  }

  onOrderClicked(order: Order) {
    if (order.shoppingCartItems.length > 1) {
      this.expandedOrder = this.expandedOrder === order ? null : order;
    }
  }

  countItems(order: Order) {
    return order.shoppingCartItems.reduce((sum, item) => sum += item.quantity, 0);
  }
}
