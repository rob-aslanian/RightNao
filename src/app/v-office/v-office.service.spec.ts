import { TestBed } from '@angular/core/testing';

import { VOfficeService } from './v-office.service';

describe('VOfficeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VOfficeService = TestBed.get(VOfficeService);
    expect(service).toBeTruthy();
  });
});
