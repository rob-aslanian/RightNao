import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMainHeaderComponent } from './calendar-main-header.component';

describe('CalendarMainHeaderComponent', () => {
  let component: CalendarMainHeaderComponent;
  let fixture: ComponentFixture<CalendarMainHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarMainHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
