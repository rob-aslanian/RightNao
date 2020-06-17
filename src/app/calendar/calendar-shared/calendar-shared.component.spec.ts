import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSharedComponent } from './calendar-shared.component';

describe('CalendarSharedComponent', () => {
  let component: CalendarSharedComponent;
  let fixture: ComponentFixture<CalendarSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
