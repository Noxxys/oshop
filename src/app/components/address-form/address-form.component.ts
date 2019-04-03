import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent {
  address: Address;
  @Output() addressSubmitted = new EventEmitter();

  constructor() {
    this.address = new Address();
    this.address.addressLines = [];
  }

  onSubmit() {
    this.addressSubmitted.emit(this.address);
  }
}
