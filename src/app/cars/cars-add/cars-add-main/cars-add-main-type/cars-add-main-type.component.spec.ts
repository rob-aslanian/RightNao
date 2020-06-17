import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddMainTypeComponent } from './cars-add-main-type.component';

describe('CarsAddMainTypeComponent', () => {
  let component: CarsAddMainTypeComponent;
  let fixture: ComponentFixture<CarsAddMainTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddMainTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddMainTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
