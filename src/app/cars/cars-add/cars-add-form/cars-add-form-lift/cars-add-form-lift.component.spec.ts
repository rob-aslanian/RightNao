import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormLiftComponent } from './cars-add-form-lift.component';

describe('CarsAddFormLiftComponent', () => {
  let component: CarsAddFormLiftComponent;
  let fixture: ComponentFixture<CarsAddFormLiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormLiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormLiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
