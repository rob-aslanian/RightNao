import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPopoverComponent } from './event-popover.component';

describe('EventPopoverComponent', () => {
  let component: EventPopoverComponent;
  let fixture: ComponentFixture<EventPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
