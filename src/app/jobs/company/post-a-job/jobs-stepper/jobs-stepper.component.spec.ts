import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsStepperComponent } from './jobs-stepper.component';

describe('JobsStepperComponent', () => {
  let component: JobsStepperComponent;
  let fixture: ComponentFixture<JobsStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
