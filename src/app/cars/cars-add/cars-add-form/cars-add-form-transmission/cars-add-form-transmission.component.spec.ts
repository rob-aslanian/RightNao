import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormTransmissionComponent } from './cars-add-form-transmission.component';

describe('CarsAddFormTransmissionComponent', () => {
  let component: CarsAddFormTransmissionComponent;
  let fixture: ComponentFixture<CarsAddFormTransmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormTransmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormTransmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
