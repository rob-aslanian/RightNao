/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserProfileLandingActiveConnectionsComponent } from './user-profile-landing-active-connections.component';

describe('UserProfileLandingActiveConnectionsComponent', () => {
  let component: UserProfileLandingActiveConnectionsComponent;
  let fixture: ComponentFixture<UserProfileLandingActiveConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileLandingActiveConnectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileLandingActiveConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
