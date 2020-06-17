import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarLeftComponent } from './calendar-left.component';

describe('CalendarLeftComponent', () => {
  let component: CalendarLeftComponent;
  let fixture: ComponentFixture<CalendarLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
