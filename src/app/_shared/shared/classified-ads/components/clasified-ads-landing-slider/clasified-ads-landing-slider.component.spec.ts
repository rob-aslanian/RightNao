import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasifiedAdsLandingSliderComponent } from './clasified-ads-landing-slider.component';

describe('ClasifiedAdsLandingSliderComponent', () => {
  let component: ClasifiedAdsLandingSliderComponent;
  let fixture: ComponentFixture<ClasifiedAdsLandingSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasifiedAdsLandingSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasifiedAdsLandingSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
