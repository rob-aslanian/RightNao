import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormFuelComponent } from './cars-add-form-fuel.component';

describe('CarsAddFormFuelComponent', () => {
  let component: CarsAddFormFuelComponent;
  let fixture: ComponentFixture<CarsAddFormFuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormFuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
