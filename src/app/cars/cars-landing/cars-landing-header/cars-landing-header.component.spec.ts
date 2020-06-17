import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsLandingHeaderComponent } from './cars-landing-header.component';

describe('CarsLandingHeaderComponent', () => {
  let component: CarsLandingHeaderComponent;
  let fixture: ComponentFixture<CarsLandingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsLandingHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsLandingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
