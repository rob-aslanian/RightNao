import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAddFormHistoryComponent } from './cars-add-form-history.component';

describe('CarsAddFormHistoryComponent', () => {
  let component: CarsAddFormHistoryComponent;
  let fixture: ComponentFixture<CarsAddFormHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsAddFormHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsAddFormHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
