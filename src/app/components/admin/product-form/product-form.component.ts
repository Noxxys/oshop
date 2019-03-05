import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/models/category.interface';
import { Product } from 'src/app/models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories: Category[];
  id: string;
  categoriesSubscription: Subscription;
  productsSubscription: Subscription;

  productForm = new FormGroup({
    titleControl: new FormControl('', [Validators.required]),
    priceControl: new FormControl('', [Validators.required, Validators.min(0)]),
    categoryControl: new FormControl('', [Validators.required]),
    imageUrlControl: new FormControl('', [
      Validators.required,
      CustomValidators.url,
    ]),
  });

  get titleControl(): FormControl {
    return this.productForm.get('titleControl') as FormControl;
  }

  get priceControl(): FormControl {
    return this.productForm.get('priceControl') as FormControl;
  }

  get categoryControl(): FormControl {
    return this.productForm.get('categoryControl') as FormControl;
  }

  get imageUrlControl(): FormControl {
    return this.productForm.get('imageUrlControl') as FormControl;
  }

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories = [];
  }

  ngOnInit() {
    this.categoriesSubscription = this.categoryService
      .getAll()
      .subscribe(categories => (this.categories = categories));

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productsSubscription = this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe((product: Product) => {
          if (product) {
            this.productForm.get('titleControl').setValue(product.title);
            this.productForm.get('priceControl').setValue(product.price);
            this.productForm
              .get('categoryControl')
              .setValue(product.categoryId);
            this.productForm.get('imageUrlControl').setValue(product.imageUrl);
          }
        });
    }
  }

  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();

    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  onSubmit() {
    const product: Product = {
      title: this.productForm.get('titleControl').value,
      price: this.productForm.get('priceControl').value,
      categoryId: this.productForm.get('categoryControl').value,
      imageUrl: this.productForm.get('imageUrlControl').value,
    };

    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  getErrorMessage(control: FormControl, fieldName: string) {
    if (control.hasError('required')) {
      return `${fieldName} is required`;
    }

    if (control.hasError('min')) {
      return `${fieldName} must have a minimum value of ${
        control.errors.min.min
      }`;
    }

    if (control.hasError('url')) {
      return `${fieldName} must be a valid URL`;
    }

    return '';
  }

  getCategoryNameById(id: string): string {
    if (!id) {
      return null;
    }

    const result = this.categories.find(category => category.id === id);
    return result ? result.name : null;
  }
}
