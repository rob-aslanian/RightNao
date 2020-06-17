import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobExposureComponent } from './job-exposure.component';

describe('JobExposureComponent', () => {
  let component: JobExposureComponent;
  let fixture: ComponentFixture<JobExposureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobExposureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobExposureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
