import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowersCompanyComponent } from './user-followers-company.component';

describe('UserFollowersCompanyComponent', () => {
  let component: UserFollowersCompanyComponent;
  let fixture: ComponentFixture<UserFollowersCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFollowersCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFollowersCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
