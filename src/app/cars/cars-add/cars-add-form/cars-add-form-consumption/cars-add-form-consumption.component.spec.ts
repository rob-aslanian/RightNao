import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormConsumptionComponent } from './cars-add-form-consumption.component';

describe('CarsAddFormConsumptionComponent', () => {
  let component: CarsAddFormConsumptionComponent;
  let fixture: ComponentFixture<CarsAddFormConsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormConsumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
