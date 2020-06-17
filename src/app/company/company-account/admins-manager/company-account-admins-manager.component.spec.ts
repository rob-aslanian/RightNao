import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAccountAdminsManagerComponent } from './company-account-admins-manager.component';

describe('CompanyAccountAdminsManagerComponent', () => {
  let component: CompanyAccountAdminsManagerComponent;
  let fixture: ComponentFixture<CompanyAccountAdminsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAccountAdminsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAccountAdminsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
