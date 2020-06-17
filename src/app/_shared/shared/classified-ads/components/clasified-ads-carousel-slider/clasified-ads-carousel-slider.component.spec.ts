import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasifiedAdsCarouselSliderComponent } from './clasified-ads-carousel-slider.component';

describe('ClasifiedAdsCarouselSliderComponent', () => {
  let component: ClasifiedAdsCarouselSliderComponent;
  let fixture: ComponentFixture<ClasifiedAdsCarouselSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasifiedAdsCarouselSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasifiedAdsCarouselSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
