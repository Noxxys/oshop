import { TestBed } from '@angular/core/testing';

import { ShoppingCartItemService } from './shopping-cart-item.service';

describe('ShoppingCartItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingCartItemService = TestBed.get(ShoppingCartItemService);
    expect(service).toBeTruthy();
  });
});
