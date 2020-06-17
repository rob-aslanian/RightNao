import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberReportedComponent } from './member-reported.component';

describe('MemberReportedComponent', () => {
  let component: MemberReportedComponent;
  let fixture: ComponentFixture<MemberReportedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberReportedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberReportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
