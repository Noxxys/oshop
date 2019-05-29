import { Component, OnInit, Input } from '@angular/core';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-address-display',
  templateUrl: './address-display.component.html',
  styleUrls: ['./address-display.component.scss']
})
export class AddressDisplayComponent implements OnInit {
  @Input() address: Address;

  constructor() { }

  ngOnInit() {
  }

}
