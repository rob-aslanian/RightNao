import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerForComapnyComponent } from './career-for-comapny.component';

describe('CareerForComapnyComponent', () => {
  let component: CareerForComapnyComponent;
  let fixture: ComponentFixture<CareerForComapnyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerForComapnyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerForComapnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
