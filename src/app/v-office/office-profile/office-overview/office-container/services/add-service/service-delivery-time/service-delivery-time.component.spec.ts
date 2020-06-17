import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDeliveryTimeComponent } from './service-delivery-time.component';

describe('ServiceDeliveryTimeComponent', () => {
  let component: ServiceDeliveryTimeComponent;
  let fixture: ComponentFixture<ServiceDeliveryTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDeliveryTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDeliveryTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
