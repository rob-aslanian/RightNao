import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationModalsComponent } from './notification-modals.component';

describe('NotificationModalsComponent', () => {
  let component: NotificationModalsComponent;
  let fixture: ComponentFixture<NotificationModalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationModalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
