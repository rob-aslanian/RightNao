import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormFinanceComponent } from './cars-add-form-finance.component';

describe('CarsAddFormFinanceComponent', () => {
  let component: CarsAddFormFinanceComponent;
  let fixture: ComponentFixture<CarsAddFormFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
