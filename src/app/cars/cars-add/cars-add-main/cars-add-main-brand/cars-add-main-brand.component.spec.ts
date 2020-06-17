import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddMainBrandComponent } from './cars-add-main-brand.component';

describe('CarsAddMainBrandComponent', () => {
  let component: CarsAddMainBrandComponent;
  let fixture: ComponentFixture<CarsAddMainBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddMainBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddMainBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
