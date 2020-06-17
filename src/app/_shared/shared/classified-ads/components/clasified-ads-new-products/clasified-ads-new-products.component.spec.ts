import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasifiedAdsNewProductsComponent } from './clasified-ads-new-products.component';

describe('ClasifiedAdsNewProductsComponent', () => {
  let component: ClasifiedAdsNewProductsComponent;
  let fixture: ComponentFixture<ClasifiedAdsNewProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasifiedAdsNewProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasifiedAdsNewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
