import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormPowerComponent } from './cars-add-form-power.component';

describe('CarsAddFormPowerComponent', () => {
  let component: CarsAddFormPowerComponent;
  let fixture: ComponentFixture<CarsAddFormPowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormPowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
