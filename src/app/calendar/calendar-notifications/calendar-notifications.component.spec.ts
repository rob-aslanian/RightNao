import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNotificationsComponent } from './calendar-notifications.component';

describe('CalendarNotificationsComponent', () => {
  let component: CalendarNotificationsComponent;
  let fixture: ComponentFixture<CalendarNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
