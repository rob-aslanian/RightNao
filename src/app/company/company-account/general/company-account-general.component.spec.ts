import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAccountGeneralComponent } from './company-account-general.component';

describe('CompanyAccountGeneralComponent', () => {
  let component: CompanyAccountGeneralComponent;
  let fixture: ComponentFixture<CompanyAccountGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAccountGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAccountGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
