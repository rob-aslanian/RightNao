import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormLengthComponent } from './cars-add-form-length.component';

describe('CarsAddFormLengthComponent', () => {
  let component: CarsAddFormLengthComponent;
  let fixture: ComponentFixture<CarsAddFormLengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormLengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormLengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
