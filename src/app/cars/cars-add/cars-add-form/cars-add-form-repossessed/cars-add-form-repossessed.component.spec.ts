import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormRepossessedComponent } from './cars-add-form-repossessed.component';

describe('CarsAddFormRepossessedComponent', () => {
  let component: CarsAddFormRepossessedComponent;
  let fixture: ComponentFixture<CarsAddFormRepossessedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormRepossessedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormRepossessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
