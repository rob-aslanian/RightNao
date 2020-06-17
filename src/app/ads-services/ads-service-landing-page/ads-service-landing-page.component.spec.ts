import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsServiceLandingPageComponent } from './ads-service-landing-page.component';

describe('AdsServiceLandingPageComponent', () => {
  let component: AdsServiceLandingPageComponent;
  let fixture: ComponentFixture<AdsServiceLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsServiceLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsServiceLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
