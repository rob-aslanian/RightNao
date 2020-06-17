import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormSeatsComponent } from './cars-add-form-seats.component';

describe('CarsAddFormSeatsComponent', () => {
  let component: CarsAddFormSeatsComponent;
  let fixture: ComponentFixture<CarsAddFormSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
