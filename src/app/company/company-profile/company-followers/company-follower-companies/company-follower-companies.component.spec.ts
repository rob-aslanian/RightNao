import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFollowerCompaniesComponent } from './company-follower-companies.component';

describe('CompanyFollowerCompaniesComponent', () => {
  let component: CompanyFollowerCompaniesComponent;
  let fixture: ComponentFixture<CompanyFollowerCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFollowerCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFollowerCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
