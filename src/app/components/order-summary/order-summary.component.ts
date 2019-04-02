import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCartItem } from 'src/app/models/shopping-cart-item.interface';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  columnsToDisplay = ['quantityAndName', 'price'];
  dataSource: MatTableDataSource<ShoppingCartItem>;
  itemsSubscription: Subscription;
  totalQuantity: Number;
  totalPrice: number;

  constructor(private cartService: ShoppingCartService) {
    this.dataSource = new MatTableDataSource<ShoppingCartItem>();

    this.cartService.initialize().then(() => {
      this.itemsSubscription = this.cartService
        .getAllItems()
        .subscribe(items => {
          this.dataSource.data = items;
          this.updateTotals();
        });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

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
