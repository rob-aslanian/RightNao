import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchConversationBoxComponent } from './search-conversation-box.component';

describe('SearchConversationBoxComponent', () => {
  let component: SearchConversationBoxComponent;
  let fixture: ComponentFixture<SearchConversationBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchConversationBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchConversationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
