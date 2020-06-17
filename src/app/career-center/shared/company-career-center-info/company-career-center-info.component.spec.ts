import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCareerCenterInfoComponent } from './company-career-center-info.component';

describe('CompanyCareerCenterInfoComponent', () => {
  let component: CompanyCareerCenterInfoComponent;
  let fixture: ComponentFixture<CompanyCareerCenterInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyCareerCenterInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCareerCenterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
