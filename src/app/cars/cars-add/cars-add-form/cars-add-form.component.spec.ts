import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormComponent } from './cars-add-form.component';

describe('CarsAddFormComponent', () => {
  let component: CarsAddFormComponent;
  let fixture: ComponentFixture<CarsAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
