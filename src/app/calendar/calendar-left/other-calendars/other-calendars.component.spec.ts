import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCalendarsComponent } from './other-calendars.component';

describe('OtherCalendarsComponent', () => {
  let component: OtherCalendarsComponent;
  let fixture: ComponentFixture<OtherCalendarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherCalendarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherCalendarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
