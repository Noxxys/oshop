import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  columnsToDisplay = ['title', 'category', 'price', 'edit'];
  fieldsToFilter = ['title', 'category', 'price'];
  dataSource: MatTableDataSource<Product>;
  subscription: Subscription;
  filterValue: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) {
    this.dataSource = new MatTableDataSource<Product>();
  }

  ngOnInit() {
    this.subscription = this.productService
      .getAllPopulatedProducts()
      .subscribe(products => (this.dataSource.data = products));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.customFilterPredicate;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  clearFilter() {
    this.filterValue = '';
    this.applyFilter();
  }

  customFilterPredicate = (data: Product, filter: string): boolean => {
    const allValues = this.fieldsToFilter.reduce(
      (text: string, field: string) =>
        (text += (data[field] + '').trim().toLowerCase()),
      ''
    );
    return allValues.includes(filter);
  };
}
