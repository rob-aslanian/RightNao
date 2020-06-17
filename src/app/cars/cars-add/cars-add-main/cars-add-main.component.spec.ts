import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddMainComponent } from './cars-add-main.component';

describe('CarsAddMainComponent', () => {
  let component: CarsAddMainComponent;
  let fixture: ComponentFixture<CarsAddMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
