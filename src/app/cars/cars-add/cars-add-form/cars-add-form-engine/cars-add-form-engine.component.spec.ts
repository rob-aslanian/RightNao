import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormEngineComponent } from './cars-add-form-engine.component';

describe('CarsAddFormEngineComponent', () => {
  let component: CarsAddFormEngineComponent;
  let fixture: ComponentFixture<CarsAddFormEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
