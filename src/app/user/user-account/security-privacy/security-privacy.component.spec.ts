import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityPrivacyComponent } from './security-privacy.component';

describe('SecurityPrivacyComponent', () => {
  let component: SecurityPrivacyComponent;
  let fixture: ComponentFixture<SecurityPrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityPrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
