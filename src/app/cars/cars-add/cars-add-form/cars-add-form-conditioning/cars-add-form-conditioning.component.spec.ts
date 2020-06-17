import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormConditioningComponent } from './cars-add-form-conditioning.component';

describe('CarsAddFormConditioningComponent', () => {
  let component: CarsAddFormConditioningComponent;
  let fixture: ComponentFixture<CarsAddFormConditioningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormConditioningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormConditioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
