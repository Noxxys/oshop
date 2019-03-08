import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.interface';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  categories$: Observable<Category[]>;
  products$: Observable<Product[]>;
  selectedCategoryId: string;

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
    route.queryParams.subscribe((params: Params) => {
      this.selectedCategoryId = params.category || '';
      this.products$ = this.productService.getPopulatedProductsByCategory(
        this.selectedCategoryId
      );
    });
  }

  onSelectedCategoryChange() {
    const queryParams = this.selectedCategoryId
      ? { category: this.selectedCategoryId }
      : null;

    this.router.navigate([], { queryParams: queryParams });
  }
}
