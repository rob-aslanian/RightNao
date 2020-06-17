import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormWeightComponent } from './cars-add-form-weight.component';

describe('CarsAddFormWeightComponent', () => {
  let component: CarsAddFormWeightComponent;
  let fixture: ComponentFixture<CarsAddFormWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
