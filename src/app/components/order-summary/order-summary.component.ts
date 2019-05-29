import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartItem } from 'src/app/models/firebase-objects/shopping-cart-item.interface';
import { MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  @Input() items$: Observable<ShoppingCartItem[]>;

  itemsSubscription: Subscription;
  columnsToDisplay = ['quantityAndName', 'price'];
  dataSource: MatTableDataSource<ShoppingCartItem>;
  totalQuantity: number;
  totalPrice: number;

  constructor() {
    this.dataSource = new MatTableDataSource<ShoppingCartItem>();
  }

  ngOnInit() {
    if (this.items$) {
      this.itemsSubscription = this.items$.subscribe(items => {
        this.dataSource.data = items;
        this.updateTotals();
      });
    }
  }

  ngOnDestroy() {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }

  // TODO: use observables to update automatically?
  private updateTotals() {
    this.totalQuantity = this.dataSource.data.reduce(
      (total, item) => (total += item.quantity),
      0
    );

    this.totalPrice = this.dataSource.data.reduce(
      (total, item) => (total += item.quantity * item.product.price),
      0
    );
  }
}
