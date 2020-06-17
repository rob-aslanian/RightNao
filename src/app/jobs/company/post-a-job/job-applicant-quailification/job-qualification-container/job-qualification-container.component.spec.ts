import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobQualificationContainerComponent } from './job-qualification-container.component';

describe('JobQualificationContainerComponent', () => {
  let component: JobQualificationContainerComponent;
  let fixture: ComponentFixture<JobQualificationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobQualificationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobQualificationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
