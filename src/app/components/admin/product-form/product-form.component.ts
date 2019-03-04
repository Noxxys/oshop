import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';
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
export class ProductFormComponent implements OnInit {
  categories$: Observable<Category[]>;
  id: string;

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required, CustomValidators.url]),
  });

  get title(): FormControl {
    return this.productForm.get('title') as FormControl;
  }

  get price(): FormControl {
    return this.productForm.get('price') as FormControl;
  }

  get category(): FormControl {
    return this.productForm.get('category') as FormControl;
  }

  get imageUrl(): FormControl {
    return this.productForm.get('imageUrl') as FormControl;
  }

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe((product: Product) => {
          if (product) {
            this.productForm.get('title').setValue(product.title);
            this.productForm.get('price').setValue(product.price);
            this.productForm.get('category').setValue(product.category);
            this.productForm.get('imageUrl').setValue(product.imageUrl);
          }
        });
    }
  }

  // save(product: Product) {
  //   if (this.id) {
  //     this.productService.update(this.id, product);
  //   } else {
  //     this.productService.create(product);
  //   }

  //   this.router.navigate(['/admin/products']);
  // }

  onSubmit() {
    const product: Product = {
      title: this.productForm.get('title').value,
      price: this.productForm.get('price').value,
      category: this.productForm.get('category').value,
      imageUrl: this.productForm.get('imageUrl').value,
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
}
