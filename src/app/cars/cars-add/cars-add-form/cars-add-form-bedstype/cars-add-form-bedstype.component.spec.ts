import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormBedstypeComponent } from './cars-add-form-bedstype.component';

describe('CarsAddFormBedstypeComponent', () => {
  let component: CarsAddFormBedstypeComponent;
  let fixture: ComponentFixture<CarsAddFormBedstypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormBedstypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormBedstypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
