import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPhoneComponent } from './company-phone.component';

describe('CompanyPhoneComponent', () => {
  let component: CompanyPhoneComponent;
  let fixture: ComponentFixture<CompanyPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
