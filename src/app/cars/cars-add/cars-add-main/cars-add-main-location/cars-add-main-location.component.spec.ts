import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddMainLocationComponent } from './cars-add-main-location.component';

describe('CarsAddMainLocationComponent', () => {
  let component: CarsAddMainLocationComponent;
  let fixture: ComponentFixture<CarsAddMainLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddMainLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddMainLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
