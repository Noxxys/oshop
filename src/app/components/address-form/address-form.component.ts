import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  address: Address;
  @Output() addressSubmitted = new EventEmitter();

  constructor() {
    this.address = new Address();
    this.address.addressLines = [];
  }

  ngOnInit() {}

  onSubmit() {
    console.log(this.address);
    this.addressSubmitted.emit(this.address);
  }
}
