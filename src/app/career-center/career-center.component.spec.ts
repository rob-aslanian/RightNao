import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerCenterComponent } from './career-center.component';

describe('CareerCenterComponent', () => {
  let component: CareerCenterComponent;
  let fixture: ComponentFixture<CareerCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
