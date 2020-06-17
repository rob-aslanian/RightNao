import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsLandingComponent } from './cars-landing.component';

describe('CarsLandingComponent', () => {
  let component: CarsLandingComponent;
  let fixture: ComponentFixture<CarsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
