/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserProfileLandingBusinessToFollowComponent } from './user-profile-landing-business-to-follow.component';

describe('UserProfileLandingBusinessToFollowComponent', () => {
  let component: UserProfileLandingBusinessToFollowComponent;
  let fixture: ComponentFixture<UserProfileLandingBusinessToFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileLandingBusinessToFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileLandingBusinessToFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
