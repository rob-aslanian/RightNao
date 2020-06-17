import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowingPeopleComponent } from './user-following-people.component';

describe('UserFollowingPeopleComponent', () => {
  let component: UserFollowingPeopleComponent;
  let fixture: ComponentFixture<UserFollowingPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFollowingPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFollowingPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
