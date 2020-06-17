import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowingCompanyComponent } from './user-following-company.component';

describe('UserFollowingCompanyComponent', () => {
  let component: UserFollowingCompanyComponent;
  let fixture: ComponentFixture<UserFollowingCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFollowingCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFollowingCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
