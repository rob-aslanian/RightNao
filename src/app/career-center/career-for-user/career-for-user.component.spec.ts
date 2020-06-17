import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerForUserComponent } from './career-for-user.component';

describe('CareerForUserComponent', () => {
  let component: CareerForUserComponent;
  let fixture: ComponentFixture<CareerForUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerForUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
