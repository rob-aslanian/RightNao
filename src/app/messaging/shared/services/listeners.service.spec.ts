import { TestBed } from '@angular/core/testing';

import { ListenersService } from './listeners.service';

describe('ListenersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListenersService = TestBed.get(ListenersService);
    expect(service).toBeTruthy();
  });
});
