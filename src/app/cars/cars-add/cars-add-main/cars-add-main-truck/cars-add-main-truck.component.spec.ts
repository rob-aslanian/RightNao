import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddMainTruckComponent } from './cars-add-main-truck.component';

describe('CarsAddMainTruckComponent', () => {
  let component: CarsAddMainTruckComponent;
  let fixture: ComponentFixture<CarsAddMainTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddMainTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddMainTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
