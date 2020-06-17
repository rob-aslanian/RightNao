import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasifiedAdsHeaderComponent } from './clasified-ads-header.component';

describe('ClasifiedAdsHeaderComponent', () => {
  let component: ClasifiedAdsHeaderComponent;
  let fixture: ComponentFixture<ClasifiedAdsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasifiedAdsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasifiedAdsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
