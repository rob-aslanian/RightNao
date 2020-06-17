import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallNewChatComponent } from './small-new-chat.component';

describe('SmallNewChatComponent', () => {
  let component: SmallNewChatComponent;
  let fixture: ComponentFixture<SmallNewChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallNewChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallNewChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
