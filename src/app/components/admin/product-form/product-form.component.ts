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
export class ProductFormComponent implements OnDestroy {
  categories: Category[];
  categoriesSubscription: Subscription;
  productsSubscription: Subscription;
  product: Product;

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
    this.product = new Product();

    this.categoriesSubscription = this.categoryService
      .getAll()
      .subscribe(categories => (this.categories = categories));

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.product.id = id;

      this.productsSubscription = this.productService
        .get(id)
        .pipe(take(1))
        .subscribe((product: Product) => {
          if (product) {
            this.product = product;
            this.product.category = this.getCategoryById(product.categoryId);

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

  onChange() {
    this.product.title = this.titleControl.value;
    this.product.categoryId = this.categoryControl.value;
    this.product.category = this.getCategoryById(this.categoryControl.value);
    this.product.price = this.priceControl.value;

    this.product.imageUrl = this.imageUrlControl.valid
      ? this.imageUrlControl.value
      : '';
  }

  onSubmit() {
    const productToSave: Product = {
      title: this.product.title,
      price: this.product.price,
      categoryId: this.product.categoryId,
      imageUrl: this.product.imageUrl,
    };

    if (this.product.id) {
      this.productService.update(this.product.id, productToSave);
    } else {
      this.productService.create(productToSave);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productService.delete(this.product.id);
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

  getCategoryById(id: string): Category {
    if (!id) {
      return null;
    }

    return this.categories.find(category => category.id === id);
  }
}
