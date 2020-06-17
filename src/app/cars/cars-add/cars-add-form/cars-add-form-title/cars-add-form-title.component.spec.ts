import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormTitleComponent } from './cars-add-form-title.component';

describe('CarsAddFormTitleComponent', () => {
  let component: CarsAddFormTitleComponent;
  let fixture: ComponentFixture<CarsAddFormTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
