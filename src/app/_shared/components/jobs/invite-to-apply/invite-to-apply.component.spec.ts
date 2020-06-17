import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteToApplyComponent } from './invite-to-apply.component';

describe('InviteToApplyComponent', () => {
  let component: InviteToApplyComponent;
  let fixture: ComponentFixture<InviteToApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteToApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteToApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
