import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallChatBoxComponent } from './small-chat-box.component';

describe('SmallChatBoxComponent', () => {
  let component: SmallChatBoxComponent;
  let fixture: ComponentFixture<SmallChatBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallChatBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallChatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
