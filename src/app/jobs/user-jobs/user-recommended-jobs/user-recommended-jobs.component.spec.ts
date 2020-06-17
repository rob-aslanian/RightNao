import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecommendedJobsComponent } from './user-recommended-jobs.component';

describe('UserRecommendedJobsComponent', () => {
  let component: UserRecommendedJobsComponent;
  let fixture: ComponentFixture<UserRecommendedJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRecommendedJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRecommendedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
