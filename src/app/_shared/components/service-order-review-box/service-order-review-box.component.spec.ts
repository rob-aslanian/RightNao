import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderReviewBoxComponent } from './service-order-review-box.component';

describe('ServiceOrderReviewBoxComponent', () => {
  let component: ServiceOrderReviewBoxComponent;
  let fixture: ComponentFixture<ServiceOrderReviewBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceOrderReviewBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceOrderReviewBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
