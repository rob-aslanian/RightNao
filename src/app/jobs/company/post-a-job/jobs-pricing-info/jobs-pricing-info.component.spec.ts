import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsPricingInfoComponent } from './jobs-pricing-info.component';

describe('JobsPricingInfoComponent', () => {
  let component: JobsPricingInfoComponent;
  let fixture: ComponentFixture<JobsPricingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsPricingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsPricingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
