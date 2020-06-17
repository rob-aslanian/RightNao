import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormMileageComponent } from './cars-add-form-mileage.component';

describe('CarsAddFormMileageComponent', () => {
  let component: CarsAddFormMileageComponent;
  let fixture: ComponentFixture<CarsAddFormMileageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormMileageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormMileageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
