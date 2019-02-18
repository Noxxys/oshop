import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  private products: Product[];
  private subscription: Subscription;
  filteredProducts: Product[];
  query = '';

  constructor(private productService: ProductService) {
    this.subscription = this.productService.sortBy('title').getAll().subscribe(
      products => {
        this.products = products;
        this.filter(this.query);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.query = query;

    if (this.query) {
      this.filteredProducts = this.products.filter(product => new RegExp(this.query, 'i').test(product.title));
    } else {
      this.filteredProducts = this.products;
    }
  }
}
