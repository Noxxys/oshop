import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/firebase-objects/product';
import { FirebaseCollection } from '../models/firebase-collection';
import { Observable, combineLatest } from 'rxjs';
import { CategoryService } from './category.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends FirebaseCollection<Product> {
  constructor(db: AngularFirestore, private categoryService: CategoryService) {
    super(db, '/products');
  }

  getAllPopulatedProducts(): Observable<Product[]> {
    // products will depend on categories, so get them together
    const categoriesAndProducts$ = combineLatest(
      this.categoryService.getAll(),
      super.getAll()
    );

    // populate each product with a category object, using its categoryId
    const productsWithCategory = categoriesAndProducts$.pipe(
      map(([categories, products]) =>
        products.map(product => {
          product.category = categories.find(
            category => category.id === product.categoryId
          );
          return product;
        })
      )
    );

    return productsWithCategory;
  }

  getPopulatedProductsByCategory(categoryId: string): Observable<Product[]> {
    if (!categoryId) {
      return this.getAllPopulatedProducts();
    }

    return this.getAllPopulatedProducts().pipe(
      map(products =>
        products.filter(product => product.categoryId === categoryId)
      )
    );
  }
}
