import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRequestsComponent } from './member-requests.component';

describe('MemberRequestsComponent', () => {
  let component: MemberRequestsComponent;
  let fixture: ComponentFixture<MemberRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
