import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageNewComponent } from './message-new.component';

describe('MessageNewComponent', () => {
  let component: MessageNewComponent;
  let fixture: ComponentFixture<MessageNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
