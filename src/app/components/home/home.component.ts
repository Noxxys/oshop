import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.interface';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

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
    private productService: ProductService
  ) {
    this.selectedCategoryId = '';
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
    this.products$ = this.productService.getPopulatedProductsByCategory(
      this.selectedCategoryId
    );
  }

  onSelectedCategoryChange() {
    this.products$ = this.productService.getPopulatedProductsByCategory(
      this.selectedCategoryId
    );
  }
}
