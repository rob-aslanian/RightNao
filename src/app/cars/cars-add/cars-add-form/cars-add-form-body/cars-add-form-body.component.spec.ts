import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormBodyComponent } from './cars-add-form-body.component';

describe('CarsAddFormBodyComponent', () => {
  let component: CarsAddFormBodyComponent;
  let fixture: ComponentFixture<CarsAddFormBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
