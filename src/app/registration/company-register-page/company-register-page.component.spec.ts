import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegisterPageComponent } from './company-register-page.component';

describe('CompanyRegisterPageComponent', () => {
  let component: CompanyRegisterPageComponent;
  let fixture: ComponentFixture<CompanyRegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRegisterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
