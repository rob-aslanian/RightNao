import { TestBed } from '@angular/core/testing';

import { AdsCreateService } from './ads-create.service';

describe('AdsCreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdsCreateService = TestBed.get(AdsCreateService);
    expect(service).toBeTruthy();
  });
});
