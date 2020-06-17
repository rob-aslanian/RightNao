import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationRowComponent } from './notification-row.component';

describe('NotificationRowComponent', () => {
  let component: NotificationRowComponent;
  let fixture: ComponentFixture<NotificationRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
