import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddForSaleComponent } from './add-for-sale.component';

describe('AddForSaleComponent', () => {
  let component: AddForSaleComponent;
  let fixture: ComponentFixture<AddForSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddForSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
