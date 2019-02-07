import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/models/category.interface';
import { Product } from 'src/app/models/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(
    categoryService: CategoryService,
    private productService: ProductService,
    private router: Router) {
    this.categories$ = categoryService.getAll();
  }

  ngOnInit() {
  }

  save(product: Product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
