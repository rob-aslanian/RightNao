import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoJobsCompanyComponent } from './demo-jobs-company.component';

describe('DemoJobsCompanyComponent', () => {
  let component: DemoJobsCompanyComponent;
  let fixture: ComponentFixture<DemoJobsCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoJobsCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoJobsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
