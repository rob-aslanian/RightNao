import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileLandingNewsFeedPostComponent } from './user-profile-landing-news-feed-post.component';

describe('UserProfileLandingNewsFeedPostComponent', () => {
  let component: UserProfileLandingNewsFeedPostComponent;
  let fixture: ComponentFixture<UserProfileLandingNewsFeedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileLandingNewsFeedPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileLandingNewsFeedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
