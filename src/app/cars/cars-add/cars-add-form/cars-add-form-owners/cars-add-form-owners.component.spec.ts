import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormOwnersComponent } from './cars-add-form-owners.component';

describe('CarsAddFormOwnersComponent', () => {
  let component: CarsAddFormOwnersComponent;
  let fixture: ComponentFixture<CarsAddFormOwnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormOwnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
