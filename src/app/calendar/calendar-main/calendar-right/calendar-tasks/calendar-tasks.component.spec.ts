import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTasksComponent } from './calendar-tasks.component';

describe('CalendarTasksComponent', () => {
  let component: CalendarTasksComponent;
  let fixture: ComponentFixture<CalendarTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
