/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserProfileLandingPeopleYouKnowComponent } from './user-profile-landing-people-you-know.component';

describe('UserProfileLandingPeopleYouKnowComponent', () => {
  let component: UserProfileLandingPeopleYouKnowComponent;
  let fixture: ComponentFixture<UserProfileLandingPeopleYouKnowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileLandingPeopleYouKnowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileLandingPeopleYouKnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
