import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ShoppingCartItem } from 'src/app/models/shopping-cart-item.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  columnsToDisplay = ['productImage', 'productName', 'quantity', 'price'];
  dataSource: MatTableDataSource<ShoppingCartItem>;
  itemsSubscription: Subscription;
  totalPrice: number;
  totalQuantity: number;

  constructor(private cartService: ShoppingCartService) {
    this.dataSource = new MatTableDataSource<ShoppingCartItem>();

    this.cartService.initialize().then(() => {
      this.itemsSubscription = this.cartService
        .getAllItems()
        .subscribe(items => {
          this.dataSource.data = items;
          this.totalQuantity = items.reduce(
            (total, item) => (total += item.quantity),
            0
          );
          this.totalPrice = items.reduce(
            (total, item) => (total += item.product.price),
            0
          );
        });
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }
}
