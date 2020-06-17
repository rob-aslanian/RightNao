import { TestBed } from '@angular/core/testing';

import { CareerCenterService } from './career-center.service';

describe('CareerCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CareerCenterService = TestBed.get(CareerCenterService);
    expect(service).toBeTruthy();
  });
});
