import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsApplicantComponent } from './jobs-applicant.component';

describe('JobsApplicantComponent', () => {
  let component: JobsApplicantComponent;
  let fixture: ComponentFixture<JobsApplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsApplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
