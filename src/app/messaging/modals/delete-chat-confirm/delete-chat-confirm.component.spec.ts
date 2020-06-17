import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteChatConfirmComponent } from './delete-chat-confirm.component';

describe('DeleteChatConfirmComponent', () => {
  let component: DeleteChatConfirmComponent;
  let fixture: ComponentFixture<DeleteChatConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteChatConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteChatConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
