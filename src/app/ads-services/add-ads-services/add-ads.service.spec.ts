import { TestBed } from '@angular/core/testing';

import { AddAdsService } from './add-ads.service';

describe('AddAdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddAdsService = TestBed.get(AddAdsService);
    expect(service).toBeTruthy();
  });
});
