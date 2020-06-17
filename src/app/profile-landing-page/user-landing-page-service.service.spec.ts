/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserLandingPageServiceService } from './user-landing-page-service.service';

describe('Service: UserLandingPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLandingPageServiceService]
    });
  });

  it('should ...', inject([UserLandingPageServiceService], (service: UserLandingPageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
