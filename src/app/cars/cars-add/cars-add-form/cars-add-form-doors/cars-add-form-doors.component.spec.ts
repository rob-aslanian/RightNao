import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormDoorsComponent } from './cars-add-form-doors.component';

describe('CarsAddFormDoorsComponent', () => {
  let component: CarsAddFormDoorsComponent;
  let fixture: ComponentFixture<CarsAddFormDoorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormDoorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormDoorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
