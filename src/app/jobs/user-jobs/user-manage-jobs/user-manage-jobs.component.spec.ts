import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManageJobsComponent } from './user-manage-jobs.component';

describe('UserManageJobsComponent', () => {
  let component: UserManageJobsComponent;
  let fixture: ComponentFixture<UserManageJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManageJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManageJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
