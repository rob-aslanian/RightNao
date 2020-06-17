import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCareerCenterJobsComponent } from './company-career-center-jobs.component';

describe('CompanyCareerCenterJobsComponent', () => {
  let component: CompanyCareerCenterJobsComponent;
  let fixture: ComponentFixture<CompanyCareerCenterJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyCareerCenterJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCareerCenterJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
