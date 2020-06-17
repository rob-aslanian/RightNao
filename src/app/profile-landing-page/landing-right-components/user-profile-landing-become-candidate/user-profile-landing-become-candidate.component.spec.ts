/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserProfileLandingBecomeCandidateComponent } from './user-profile-landing-become-candidate.component';

describe('UserProfileLandingBecomeCandidateComponent', () => {
  let component: UserProfileLandingBecomeCandidateComponent;
  let fixture: ComponentFixture<UserProfileLandingBecomeCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileLandingBecomeCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileLandingBecomeCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
