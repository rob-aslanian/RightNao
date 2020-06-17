import { TestBed } from '@angular/core/testing';

import { AdsServicesService } from './ads-services.service';

describe('AdsServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdsServicesService = TestBed.get(AdsServicesService);
    expect(service).toBeTruthy();
  });
});
