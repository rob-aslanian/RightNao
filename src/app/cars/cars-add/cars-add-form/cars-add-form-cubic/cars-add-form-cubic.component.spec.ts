import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormCubicComponent } from './cars-add-form-cubic.component';

describe('CarsAddFormCubicComponent', () => {
  let component: CarsAddFormCubicComponent;
  let fixture: ComponentFixture<CarsAddFormCubicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormCubicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormCubicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
