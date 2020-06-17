import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormCylindersComponent } from './cars-add-form-cylinders.component';

describe('CarsAddFormCylindersComponent', () => {
  let component: CarsAddFormCylindersComponent;
  let fixture: ComponentFixture<CarsAddFormCylindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormCylindersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormCylindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
