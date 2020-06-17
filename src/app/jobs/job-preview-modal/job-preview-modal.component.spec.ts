import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPreviewModalComponent } from './job-preview-modal.component';

describe('JobPreviewModalComponent', () => {
  let component: JobPreviewModalComponent;
  let fixture: ComponentFixture<JobPreviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPreviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
