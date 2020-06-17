import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoMessagingComponent } from './demo-messaging.component';

describe('DemoMessagingComponent', () => {
  let component: DemoMessagingComponent;
  let fixture: ComponentFixture<DemoMessagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoMessagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
