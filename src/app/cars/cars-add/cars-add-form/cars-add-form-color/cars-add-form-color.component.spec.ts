import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormColorComponent } from './cars-add-form-color.component';

describe('CarsAddFormColorComponent', () => {
  let component: CarsAddFormColorComponent;
  let fixture: ComponentFixture<CarsAddFormColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
