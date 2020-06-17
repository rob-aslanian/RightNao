import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormCapacityComponent } from './cars-add-form-capacity.component';

describe('CarsAddFormCapacityComponent', () => {
  let component: CarsAddFormCapacityComponent;
  let fixture: ComponentFixture<CarsAddFormCapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormCapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
