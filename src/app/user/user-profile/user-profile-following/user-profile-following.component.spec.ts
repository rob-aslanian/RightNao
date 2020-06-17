import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileFollowingComponent } from './user-profile-following.component';

describe('UserProfileFollowingComponent', () => {
  let component: UserProfileFollowingComponent;
  let fixture: ComponentFixture<UserProfileFollowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileFollowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
