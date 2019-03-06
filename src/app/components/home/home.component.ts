import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.interface';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import {
  Router,
  ActivatedRoute,
  NavigationStart,
  Params,
} from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories$: Observable<Category[]>;
  products$: Observable<Product[]>;
  selectedCategoryId: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.selectedCategoryId = '';

    route.queryParams.subscribe((params: Params) => {
      console.group('route.queryParams.subscribe');
      console.log('params.category', params.category);
      console.log('this.selectedCategoryId', this.selectedCategoryId);
      console.groupEnd();

      if (params.category !== this.selectedCategoryId) {
        this.selectedCategoryId = params.category || '';
        this.onSelectedCategoryChange();
      }
    });
  }

  ngOnInit() {
    // TODO: move this to the constructor and see if it improves the situation with query params

    console.group('ngOnInit');
    console.log('this.selectedCategoryId before', this.selectedCategoryId);
    this.selectedCategoryId =
      this.route.snapshot.queryParamMap.get('category') || '';
    console.log('this.selectedCategoryId after', this.selectedCategoryId);

    this.categories$ = this.categoryService.getAll();
    this.products$ = this.productService.getPopulatedProductsByCategory(
      this.selectedCategoryId
    );

    console.groupEnd();
  }

  onSelectedCategoryChange() {
    console.group('onSelectedCategoryChange');

    this.products$ = this.productService.getPopulatedProductsByCategory(
      this.selectedCategoryId
    );

    const queryParams = this.selectedCategoryId
      ? { category: this.selectedCategoryId }
      : null;

    console.log('queryParams', queryParams);
    console.log('navigate');

    this.router.navigate([], { queryParams: queryParams });

    console.groupEnd();
  }
}
