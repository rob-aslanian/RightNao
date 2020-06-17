import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasifiedAdsBoxComponent } from './clasified-ads-box.component';

describe('ClasifiedAdsBoxComponent', () => {
  let component: ClasifiedAdsBoxComponent;
  let fixture: ComponentFixture<ClasifiedAdsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasifiedAdsBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasifiedAdsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
