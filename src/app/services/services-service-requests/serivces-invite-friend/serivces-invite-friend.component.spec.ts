import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerivcesInviteFriendComponent } from './serivces-invite-friend.component';

describe('SerivcesInviteFriendComponent', () => {
  let component: SerivcesInviteFriendComponent;
  let fixture: ComponentFixture<SerivcesInviteFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerivcesInviteFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerivcesInviteFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
