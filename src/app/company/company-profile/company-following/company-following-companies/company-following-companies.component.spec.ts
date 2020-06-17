import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFollowingCompaniesComponent } from './company-following-companies.component';

describe('CompanyFollowingCompaniesComponent', () => {
  let component: CompanyFollowingCompaniesComponent;
  let fixture: ComponentFixture<CompanyFollowingCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFollowingCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFollowingCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
