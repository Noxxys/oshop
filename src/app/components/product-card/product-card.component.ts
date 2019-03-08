import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() title: string;
  @Input() category: string;
  @Input() imageUrl: string;
  @Input() price: string;
  @Input() showAddToCartButton: boolean;

  constructor() {}

  ngOnInit() {}
}
