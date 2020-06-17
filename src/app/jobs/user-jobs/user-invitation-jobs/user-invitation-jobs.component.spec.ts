import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInvitationJobsComponent } from './user-invitation-jobs.component';

describe('UserInvitationJobsComponent', () => {
  let component: UserInvitationJobsComponent;
  let fixture: ComponentFixture<UserInvitationJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInvitationJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInvitationJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
