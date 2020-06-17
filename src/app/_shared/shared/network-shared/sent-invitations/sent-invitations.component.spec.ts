import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentInvitationsComponent } from './sent-invitations.component';

describe('SentInvitationsComponent', () => {
  let component: SentInvitationsComponent;
  let fixture: ComponentFixture<SentInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
