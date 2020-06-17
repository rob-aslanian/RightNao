import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormHeightComponent } from './cars-add-form-height.component';

describe('CarsAddFormHeightComponent', () => {
  let component: CarsAddFormHeightComponent;
  let fixture: ComponentFixture<CarsAddFormHeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormHeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormHeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
