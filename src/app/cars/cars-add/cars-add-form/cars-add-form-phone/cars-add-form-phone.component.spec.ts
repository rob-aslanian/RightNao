import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormPhoneComponent } from './cars-add-form-phone.component';

describe('CarsAddFormPhoneComponent', () => {
  let component: CarsAddFormPhoneComponent;
  let fixture: ComponentFixture<CarsAddFormPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
