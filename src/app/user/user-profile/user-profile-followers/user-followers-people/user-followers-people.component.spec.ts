import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowersPeopleComponent } from './user-followers-people.component';

describe('UserFollowersPeopleComponent', () => {
  let component: UserFollowersPeopleComponent;
  let fixture: ComponentFixture<UserFollowersPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFollowersPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFollowersPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
