import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormPriceComponent } from './cars-add-form-price.component';

describe('CarsAddFormPriceComponent', () => {
  let component: CarsAddFormPriceComponent;
  let fixture: ComponentFixture<CarsAddFormPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
