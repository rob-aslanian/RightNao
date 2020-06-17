import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPetsComponent } from './payment-pets.component';

describe('PaymentPetsComponent', () => {
  let component: PaymentPetsComponent;
  let fixture: ComponentFixture<PaymentPetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentPetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
