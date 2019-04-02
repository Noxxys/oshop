import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  address: Address;
  constructor() {}

  ngOnInit() {}

  onAddressSubmitted(address: Address) {
    console.log('address received: ' + JSON.stringify(address));
    this.address = address;
  }
}
