import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventsComponent } from './calendar-events.component';

describe('CalendarEventsComponent', () => {
  let component: CalendarEventsComponent;
  let fixture: ComponentFixture<CalendarEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
