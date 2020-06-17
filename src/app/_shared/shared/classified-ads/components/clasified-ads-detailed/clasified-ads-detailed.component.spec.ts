import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasifiedAdsDetailedComponent } from './clasified-ads-detailed.component';

describe('ClasifiedAdsDetailedComponent', () => {
  let component: ClasifiedAdsDetailedComponent;
  let fixture: ComponentFixture<ClasifiedAdsDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasifiedAdsDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasifiedAdsDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
