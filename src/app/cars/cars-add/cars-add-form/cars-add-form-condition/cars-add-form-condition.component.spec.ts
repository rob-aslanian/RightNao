import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormConditionComponent } from './cars-add-form-condition.component';

describe('CarsAddFormConditionComponent', () => {
  let component: CarsAddFormConditionComponent;
  let fixture: ComponentFixture<CarsAddFormConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
