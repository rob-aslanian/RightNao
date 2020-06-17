import { TestBed } from '@angular/core/testing';

import { CarsAddService } from './cars-add.service';

describe('CarsAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarsAddService = TestBed.get(CarsAddService);
    expect(service).toBeTruthy();
  });
});
