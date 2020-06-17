import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNowModalComponent } from './order-now-modal.component';

describe('OrderNowModalComponent', () => {
  let component: OrderNowModalComponent;
  let fixture: ComponentFixture<OrderNowModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderNowModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderNowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
