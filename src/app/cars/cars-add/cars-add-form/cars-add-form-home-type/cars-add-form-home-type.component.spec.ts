import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormHomeTypeComponent } from './cars-add-form-home-type.component';

describe('CarsAddFormHomeTypeComponent', () => {
  let component: CarsAddFormHomeTypeComponent;
  let fixture: ComponentFixture<CarsAddFormHomeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormHomeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormHomeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
