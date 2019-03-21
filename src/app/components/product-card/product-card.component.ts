import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCartItem } from 'src/app/models/shopping-cart-item.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, OnDestroy, OnChanges {
  @Input() product: Product;
  @Input() isAdminPreview: Boolean;
  item: ShoppingCartItem;
  cartItemSubscription: Subscription;

  get title() {
    return this.product ? this.product.title || 'Title' : 'Title';
  }

  get category() {
    return this.item.product
      ? this.item.product.category
        ? this.item.product.category.name
        : 'Category'
      : 'Category';
  }

  get imageUrl() {
    return this.item.product
      ? this.item.product.imageUrl
        ? this.item.product.imageUrl
        : ''
      : '';
  }

  get price() {
    return this.item.product ? this.item.product.price || '0' : '0';
  }

  constructor(private cartService: ShoppingCartService) {
    this.item = {
      product: {
        categoryId: null,
        title: null,
        price: null,
        imageUrl: null,
      },
      quantity: 0,
    };
  }

  ngOnInit() {
  }

  async ngOnChanges() {
    await this.cartService.initialize();
    this.item.product = this.product;

    if (this.item.product) {
      const cartItem$ = this.cartService.getItem(this.item.product.id);
      this.cartItemSubscription = cartItem$.subscribe(
        cartItem => (this.item.quantity = cartItem.quantity || 0)
      );
    }
  }

  ngOnDestroy() {
    this.cartItemSubscription.unsubscribe();
  }

  addToCart() {
    this.cartService.addToCart(this.item.product);
    this.item.quantity += 1;
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.item.product.id);
    this.item.quantity -= 1;
  }
}
