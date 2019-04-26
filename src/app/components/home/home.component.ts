import { Component, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/models/firebase-objects/category.interface';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/firebase-objects/product';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ShoppingCartItem } from 'src/app/models/firebase-objects/shopping-cart-item.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  categories$: Observable<Category[]>;
  products$: Observable<Product[]>;
  items$: Observable<ShoppingCartItem[]>;
  selectedCategoryId: string;
  queryParamsSubscription: Subscription;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    route: ActivatedRoute
  ) {
    // select all categories by default
    this.selectedCategoryId = '';
    this.categories$ = this.categoryService.getAll();

    // when the query params change, update the selected category and displayed products
    // this is also triggered on page load
    this.queryParamsSubscription = route.queryParams.subscribe(
      (params: Params) => {
        this.selectedCategoryId = params.category || '';
        this.products$ = this.productService.getPopulatedProductsByCategory(
          this.selectedCategoryId
        );
      }
    );
  }

  ngOnDestroy() {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  onSelectedCategoryChange() {
    const queryParams = this.selectedCategoryId
      ? { category: this.selectedCategoryId }
      : null;

    this.router.navigate([], { queryParams: queryParams });
  }
}
