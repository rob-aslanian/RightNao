import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileFollowersComponent } from './user-profile-followers.component';

describe('UserProfileFollowersComponent', () => {
  let component: UserProfileFollowersComponent;
  let fixture: ComponentFixture<UserProfileFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileFollowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
