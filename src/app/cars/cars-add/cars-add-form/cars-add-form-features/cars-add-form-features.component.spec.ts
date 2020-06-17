import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormFeaturesComponent } from './cars-add-form-features.component';

describe('CarsAddFormFeaturesComponent', () => {
  let component: CarsAddFormFeaturesComponent;
  let fixture: ComponentFixture<CarsAddFormFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
