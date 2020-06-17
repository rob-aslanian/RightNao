import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobQualificationModalComponent } from './job-qualification-modal.component';

describe('JobQualificationModalComponent', () => {
  let component: JobQualificationModalComponent;
  let fixture: ComponentFixture<JobQualificationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobQualificationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobQualificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
