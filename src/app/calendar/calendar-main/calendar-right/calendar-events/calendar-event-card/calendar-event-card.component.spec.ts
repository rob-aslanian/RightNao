import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventCardComponent } from './calendar-event-card.component';

describe('CalendarEventCardComponent', () => {
  let component: CalendarEventCardComponent;
  let fixture: ComponentFixture<CalendarEventCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarEventCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
