import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormLifeComponent } from './cars-add-form-life.component';

describe('CarsAddFormLifeComponent', () => {
  let component: CarsAddFormLifeComponent;
  let fixture: ComponentFixture<CarsAddFormLifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormLifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
