import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBenefitsModalComponent } from './job-benefits-modal.component';

describe('JobBenefitsModalComponent', () => {
  let component: JobBenefitsModalComponent;
  let fixture: ComponentFixture<JobBenefitsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobBenefitsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBenefitsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
