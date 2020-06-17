import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsApplicantsComponent } from './jobs-applicants.component';

describe('JobsApplicantsComponent', () => {
  let component: JobsApplicantsComponent;
  let fixture: ComponentFixture<JobsApplicantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsApplicantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
