import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallConversationsComponent } from './small-conversations.component';

describe('SmallConversationsComponent', () => {
  let component: SmallConversationsComponent;
  let fixture: ComponentFixture<SmallConversationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallConversationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallConversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
