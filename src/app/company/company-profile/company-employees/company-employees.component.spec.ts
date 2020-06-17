import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEmployeesComponent } from './company-employees.component';

describe('CompanyEmployeesComponent', () => {
  let component: CompanyEmployeesComponent;
  let fixture: ComponentFixture<CompanyEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
