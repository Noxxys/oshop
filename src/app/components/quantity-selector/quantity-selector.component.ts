import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingCartItem } from 'src/app/models/shopping-cart-item.interface';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss']
})
export class QuantitySelectorComponent implements OnInit {
  @Input() item: ShoppingCartItem;
  @Input() suffixText: string;
  @Output() quantityPlusOne = new EventEmitter();
  @Output() quantityMinusOne = new EventEmitter();

  constructor() {
   }

  ngOnInit() {
  }

  plusOne() {
    this.quantityPlusOne.emit();
  }

  minusOne() {
    this.quantityMinusOne.emit();
  }
}
