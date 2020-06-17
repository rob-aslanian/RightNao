import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuteChatComponent } from './mute-chat.component';

describe('MuteChatComponent', () => {
  let component: MuteChatComponent;
  let fixture: ComponentFixture<MuteChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuteChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuteChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
