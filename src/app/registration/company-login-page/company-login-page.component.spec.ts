import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLoginPageComponent } from './company-login-page.component';

describe('CompanyLoginPageComponent', () => {
  let component: CompanyLoginPageComponent;
  let fixture: ComponentFixture<CompanyLoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLoginPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
