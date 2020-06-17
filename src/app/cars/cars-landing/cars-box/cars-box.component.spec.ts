import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsBoxComponent } from './cars-box.component';

describe('CarsBoxComponent', () => {
  let component: CarsBoxComponent;
  let fixture: ComponentFixture<CarsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
