import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicantQuailificationComponent } from './job-applicant-quailification.component';

describe('JobApplicantQuailificationComponent', () => {
  let component: JobApplicantQuailificationComponent;
  let fixture: ComponentFixture<JobApplicantQuailificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobApplicantQuailificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicantQuailificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
