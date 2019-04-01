import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  address: Address;

  constructor() {
    this.address = new Address();
    this.address.addressLines = [];
  }

  ngOnInit() {}

  get diagnostic() { return JSON.stringify(this.address); }
}
