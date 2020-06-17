import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventPopoverComponent } from './add-event-popover.component';

describe('AddEventPopoverComponent', () => {
  let component: AddEventPopoverComponent;
  let fixture: ComponentFixture<AddEventPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
