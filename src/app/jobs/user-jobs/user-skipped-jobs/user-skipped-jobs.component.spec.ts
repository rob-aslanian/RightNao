import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSkippedJobsComponent } from './user-skipped-jobs.component';

describe('UserSkippedJobsComponent', () => {
  let component: UserSkippedJobsComponent;
  let fixture: ComponentFixture<UserSkippedJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSkippedJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSkippedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
