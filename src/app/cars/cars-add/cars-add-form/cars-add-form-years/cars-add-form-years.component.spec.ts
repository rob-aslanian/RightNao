import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormYearsComponent } from './cars-add-form-years.component';

describe('CarsAddFormYearsComponent', () => {
  let component: CarsAddFormYearsComponent;
  let fixture: ComponentFixture<CarsAddFormYearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormYearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
