import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';
import { Address } from 'src/app/models/address';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit, OnDestroy {
  @Input() isReadOnly: boolean;
  @Input() address$: Observable<Address>;
  @Output() addressSubmitted = new EventEmitter();

  address: Address;
  addressSubscription: Subscription;

  constructor() {
    this.address = new Address();
    this.address.addressLines = [];
  }

  ngOnInit() {
    console.log('address$', this.address$);

    if (this.address$) {
      this.addressSubscription = this.address$.subscribe(address => {
        this.address = address;
        console.log('address', address); // TODO: we get nothing here
      });
    }
  }

  ngOnDestroy() {
    if (this.addressSubscription) {
      this.addressSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.addressSubmitted.emit(this.address);
  }
}
