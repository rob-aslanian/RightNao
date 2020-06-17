import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentEstateComponent } from './payment-estate.component';

describe('PaymentEstateComponent', () => {
  let component: PaymentEstateComponent;
  let fixture: ComponentFixture<PaymentEstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentEstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
