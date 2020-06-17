import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarRightComponent } from './calendar-right.component';

describe('CalendarRightComponent', () => {
  let component: CalendarRightComponent;
  let fixture: ComponentFixture<CalendarRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
