import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalendarModalComponent } from './add-calendar-modal.component';

describe('AddCalendarModalComponent', () => {
  let component: AddCalendarModalComponent;
  let fixture: ComponentFixture<AddCalendarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCalendarModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCalendarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
