import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsManageComponent } from './cars-manage.component';

describe('CarsManageComponent', () => {
  let component: CarsManageComponent;
  let fixture: ComponentFixture<CarsManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
