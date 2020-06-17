import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormBedsnumberComponent } from './cars-add-form-bedsnumber.component';

describe('CarsAddFormBedsnumberComponent', () => {
  let component: CarsAddFormBedsnumberComponent;
  let fixture: ComponentFixture<CarsAddFormBedsnumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormBedsnumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormBedsnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
