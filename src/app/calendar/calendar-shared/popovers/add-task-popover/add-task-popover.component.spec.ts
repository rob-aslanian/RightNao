import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskPopoverComponent } from './add-task-popover.component';

describe('AddTaskPopoverComponent', () => {
  let component: AddTaskPopoverComponent;
  let fixture: ComponentFixture<AddTaskPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
